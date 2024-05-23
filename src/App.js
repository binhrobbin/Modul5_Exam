import './App.css';
import { BrowserRouter, Route, Routes,NavLink } from 'react-router-dom';
import OrderList from './components/OrderList';
import Create from './components/OrderCreate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './components/OrderUpdate';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <NavLink to={'/orders'}>Danh sách </NavLink> | 
    <NavLink to={'/create'}> Tạo mới</NavLink>
    <Routes>
      <Route path='/orders' element={<OrderList/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/orders/:id/update' element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </div>
  );
}

export default App;

