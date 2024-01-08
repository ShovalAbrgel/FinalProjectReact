import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PurchaseComp = () => {
  const customers = useSelector((state) => state?.customers || []);
  const products = useSelector((state) => state?.products || []);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const btnSearch = () => {
    const filteredCustomers = customers.filter((customer) => {
      const isMatchingCustomer =
      (!selectedCustomer || customer.id === parseInt(selectedCustomer)) &&
      (!selectedDate || !customer.purchasedDate || customer.purchasedDate === selectedDate) &&
      (!selectedProduct || customer.productIds.includes(parseInt(selectedProduct)));    
  
      return isMatchingCustomer;
    });
  
    setSearchResults(filteredCustomers);
  
    console.log('Filtered Customers:', filteredCustomers);
  };
  

  return (
    <div>
      <select onChange={(e) => setSelectedProduct(e.target.value)}>
        Products: <option value={''}>See all products</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <br />
      <select onChange={(e) => setSelectedCustomer(e.target.value)}>
        Customers: <option value={''}>See all customers</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.fn} {customer.ln}
          </option>
        ))}
      </select>
      <br />
      Date: <input type='date' onChange={(e) => setSelectedDate(e.target.value)} />
      <br />
      <button onClick={btnSearch}>Search</button>

      
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Products</th>
                <th>Purchased Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.fn} {customer.ln}</td>
                  <td>
                    {customer.productIds.map((productId) => {
                      const product = products.find((p) => p.id === productId);
                      return <div key={productId}>{product.name}</div>;
                    })}
                  </td>
                  <td>{customer.purchasedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
    </div>
  );
};

export default PurchaseComp;
