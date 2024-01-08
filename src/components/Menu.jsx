import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

const MenuComp = () => {
  return (
    <div className='container'>
      <div className='heading'>
        <h1>Welcome to our store</h1><StorefrontIcon/>
      </div>
      Menu :<ul>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <br/>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <br/>
        <li>
          <Link to="/purchases">Purchases</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuComp;
