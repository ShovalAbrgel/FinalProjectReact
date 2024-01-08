import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CustomerComp = () => {
  const customers = useSelector((state) => state?.customers || []);
  const products = useSelector((state) => state?.products || []);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState('');
  
  const [showBuyForm, setShowBuyForm] = useState(false);

  const handleAddBtn = () => {
    setShowBuyForm(true);
  };

  const handleBuyProduct = () => {
    if (!selectedProduct) {
      alert('Please select a product.');
      return;
    }

    const customerId = customers[0].id;

    const newPurchase = {
      customerId: customerId,
      productId: selectedProduct,
      purchasedDate: new Date().toISOString().split('T')[0],
    };

    dispatch({
      type: 'ADD_PURCHASE',
      payload: newPurchase,
    });


    setSelectedProduct('');
    setShowBuyForm(false);
  };

  return (
    <div>
      {customers.map((customer) => (
        <div key={customer.id}>
          <table border={1}>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Products</th>
                <th>Purchased Dates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customer.fn}</td>
                <td>
                  {customer.productIds.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return (
                      <div key={productId}>
                        <p>
                          <Link to={`/EditProduct/${product.id}`}>{product.name}</Link>
                        </p>
                      </div>
                    );
                  })}
                </td>
                <td>{customer.purchasedDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div>
        {!showBuyForm && <button onClick={handleAddBtn}>Buy Product</button>}
        {showBuyForm && (
          <div>
            <select onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value={''}>Select product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <br />
            <button onClick={handleBuyProduct}>Buy</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerComp;
