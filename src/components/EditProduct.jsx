import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditProductComp = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useSelector((state) => state?.products || []);
  const customers = useSelector((state) => state?.customers || []);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [totalPurchased,setTotalPurchased] = useState(0);

  const navigate = useNavigate();

  const existingProduct = products.find((p) => p.id === productId);
  useEffect(() => {
    if (!existingProduct) {
      navigate('/products');
      return;
    }
  
    setProductName(existingProduct.name || "");
    setProductPrice(existingProduct.price || "");
    setProductQuantity(existingProduct.Quantity || ""); 
  }, [productId, products, existingProduct, navigate]);
  
  const handleUpdateBtn = () => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: {
        productId,
        name: productName,
        price: productPrice,
        Quantity: productQuantity, 
      },
    });
    setTotalPurchased((prevTotal) => prevTotal + 1);

    navigate('/products');
  };
  

  const handleDeleteBtn = () => {
    dispatch({
      type: 'REMOVE_PRODUCT',
      payload: {
        productId,
      },
    });
    setTotalPurchased((prevTotal) => prevTotal + 1);

    navigate('/products');
    console.log(setTotalPurchased);
  };

  const customersForProduct = customers.filter((customer) => customer.productIds.includes(productId));

  return (
    <div>
      <h1>Edit Product</h1>
      {existingProduct ? ( 
        <div>
          <label>
            Product Name:
            <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
          </label>
          <br />
          <label>
            Product Price:
            <input type='text' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          </label>
          <br />
          <label>
            Product Quantity:
            <input type='text' value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
          </label>
          <br />

          <button onClick={handleUpdateBtn}>Update</button>
          <button onClick={handleDeleteBtn}>Delete</button>
        </div>
      ) : (
        <p>Product not found.</p>
      )}

      <div>
        <h3>Customers who bought the product</h3>
        {customersForProduct.length > 0 ? (
          <ul>
            {customersForProduct.map((customer) => (
              <li key={customer.id}>
                <Link to={`/EditCustomer/${customer.id}`}>
                  {customer.fn} {customer.ln}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No customers have purchased this product yet.</p>
        )}
      </div>
    </div>
  );
};

export default EditProductComp;
