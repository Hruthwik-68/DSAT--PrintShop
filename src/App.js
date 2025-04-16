  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from './pages/Home';
  import Upload from './pages/Upload';
  import Payment from './pages/Payment';
  import OrderStatus from './pages/OrderStatus';
  import Marquee from './components/Marquee'; 

  function App() {
    return (
      <Router>
        <Marquee/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-status" element={<OrderStatus />} />
        </Routes>
      </Router>
    );
  }

  export default App;
