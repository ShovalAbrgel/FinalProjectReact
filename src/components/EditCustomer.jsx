import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Update } from "@mui/icons-material";
import { useParams } from 'react-router-dom';

const EditCustomerComp = () => {
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [city, setCity] = useState('');
  const { customerId } = useParams();

  const customers = useSelector((state) => state?.customers || []);
  const products = useSelector((state) => state?.products || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const customer = customers.find((c) => c.id === parseInt(customerId, 10)) || {};
    setFn(customer.fn || '');
    setLn(customer.ln || '');
    setCity(customer.city || '');
  }, [customerId, customers]);

  // Filter products based on customer's productIds
  const customer = customers.find((c) => c.id === parseInt(customerId, 10)) || {};
  const ProductForCustomer = products.filter((product) => customer.productIds && customer.productIds.includes(product.id));

  const handleUpdateBtn = () => {
    dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: {
        customerId: parseInt(customerId, 10),
        updatedCustomers: {
          fn,
          ln,
          city,
        },
      },
    });
    navigate('/customers');
  };

  const handleDeleteBtn = () => {
    dispatch({
      type: 'REMOVE_CUSTOMER',
      payload: parseInt(customerId, 10),
    });
    navigate('/customers');
  };

  return (
    <div>
      <h1>Edit Customer</h1>
      <label>
        First Name :<input value={fn} onChange={(e) => setFn(e.target.value)} type="text" />
      </label>
      <br />
      <label>
        Last Name :<input value={ln} onChange={(e) => setLn(e.target.value)} type="text" />
      </label>
      <br />
      <label>
        City :<input type="text" onChange={(e) => setCity(e.target.value)} value={city} />
      </label>
      <br />
      <Update />
      <button onClick={handleUpdateBtn}>Update</button>
      <button onClick={handleDeleteBtn}>Delete</button>

      <div>
        <h3>Purchased products</h3>
        <ul>
          {ProductForCustomer.map((product) => (
            <li key={product.id}>
              <Link to={`/EditProduct/${product.id}`}>
                {product.name} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditCustomerComp;
