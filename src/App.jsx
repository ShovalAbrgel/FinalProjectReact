import './App.css'
import MenuComp from './components/Menu'
import ProductsComp from './components/Products'
import CustomresComp from './components/Customers'
import PurchasesComp from './components/purchases'
import EditProductComp from './components/EditProduct'
import EditCustomerComp from './components/EditCustomer'
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<MenuComp />} />
        <Route path='/products' element={<ProductsComp />} />
        <Route path='/customers' element={<CustomresComp />} />
        <Route path='/purchases' element={<PurchasesComp />} />
        <Route path='/EditProduct/:productId' element={<EditProductComp />} />
        <Route path='/EditCustomer/:customerId' element={<EditCustomerComp />} />
      </Routes>
    </div>
    
  );
}

export default App;
