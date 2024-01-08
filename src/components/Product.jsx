import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ProductComp = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products || []);
  const customers = useSelector((state) => state?.customers || []);
  const totalPurchased = useSelector((state) => state?.totalPurchased || 2);

  const [showAddProductForm, setShowAddProduct] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleAddProduct = (customerId) => {
    setSelectedProduct('');
    setShowAddProduct(true);
    setSelectedCustomerId(customerId);

  };
  const handleSaveProduct = () => {
    if (!selectedProduct) {
      console.error('Selected product is not valid');
      return;
    }
  
    const selectedProductData = products.find((product) => product.id === +selectedProduct);
  
    if (!selectedProductData) {
      console.error('Selected product not found in the products array');
      console.log('All Products:', products);
      return;
    }
  
    const customerId = selectedCustomerId;
    const productId = selectedProductData.id;
  
    const existingPurchaseIndex = customers.findIndex(
      (customer) => customer.id === customerId && customer.productIds.includes(productId)
    );
  
    if (existingPurchaseIndex !== -1) {
      const existingPurchase = customers[existingPurchaseIndex];
    
      const purchaseDates = existingPurchase.purchaseDates || {};
    
      if (!purchaseDates[productId]) {
        const updatedPurchase = {
          ...existingPurchase,
          purchaseDates: {
            ...purchaseDates,
            [productId]: new Date().toISOString().split('T')[0],
          },
        };
    
        dispatch({
          type: 'UPDATE_PURCHASE',
          payload: updatedPurchase,
        });
    
        dispatch({
          type: 'UPDATE_CUSTOMER_PURCHASE_DATE',
          payload: {
            customerId,
            productId,
            purchasedDate: updatedPurchase.purchaseDates[productId],
          },
        });
      }

    
    } else {
      const newProduct = {
        id: uuidv4(),
        name: selectedProductData.name,
        price: selectedProductData.price,
        Quantity: selectedProductData.Quantity,
        purchasedDate: new Date().toISOString().split('T')[0],
      };
  
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {
          ...newProduct,
          productId: newProduct.id,
        },
      });
  
      const newPurchase = {
        customerId,
        productId: newProduct.id,
        purchasedDate: newProduct.purchasedDate,
      };
  
      dispatch({
        type: 'ADD_PURCHASE',
        payload: newPurchase,
      });
  
      dispatch({
        type: 'ADD_CUSTOMER_PRODUCT',
        payload: {
          customerId,
          productId: newProduct.id,
        },
      });
  
      dispatch({
        type: 'UPDATE_CUSTOMER_PURCHASE_DATE',
        payload: {
          customerId,
          productId: newProduct.id,
          purchasedDate: newProduct.purchasedDate,
        },
      });
  
      dispatch({
        type: 'UPDATE_TOTAL_PURCHASED',
        payload: totalPurchased + 1,
      });
    
    
    }

    
  
    setSelectedProduct('');
    setSelectedCustomerId(null);
    setShowAddProduct(false);
  };
  
  
  
  
  
  
  



  return (
    <div>
      <h2>Total Purchased Products</h2>
      <div style={{ border: '2px solid palevioletred', marginBottom: '10px' }}>
        <p>
          <strong> total amount of purchased products:</strong> {totalPurchased}
        </p>
      </div>
      
      <h2>All Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
     
        {products.map((product) => (
          <div style={{ border: '2px solid palevioletred', marginRight: '10px', width: '400px', height: '400px', marginBottom: '10px' }} key={product.id}>
            <p>
              <strong>Name : </strong>
              <Link to={`/EditProduct/${product.id}`}>{product.name}</Link>
            </p>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
            <p>
              <strong>Quantity:</strong> {product.Quantity}
            </p>

            <h3>Customers that bought the product</h3>
            {customers
              .filter((customer) => customer.productIds.includes(product.id))
              .map((customer) => (
                <div key={customer.id}>
                  <Link to={`/EditCustomer/${customer.id}`}>
                    {customer.fn} {customer.ln}
                  </Link>
                  <p>
                    <strong>Purchased Date:</strong> {customer.purchasedDate}
                    
                  </p>
                  <button onClick={() => handleAddProduct(customer.id)}>Add</button>
                  <br />

                  {showAddProductForm && selectedCustomerId === customer.id && (
                    <div style={{ border: '2px solid black', padding: '30px', marginBottom: '20px' }}>
                      <label>
                        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                          <option value=''>Select a product</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <br />
                      <button onClick={handleSaveProduct}>Save</button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComp;
