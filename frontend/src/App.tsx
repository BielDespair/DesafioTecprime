import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import './App.css';
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';
import { MyOrders } from './pages/MyOrders';
import { OrderDetails } from './pages/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;