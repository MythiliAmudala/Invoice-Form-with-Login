import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceDetails from './components/InvoiceDetails';
import LoginForm from './components/LoginForm';  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />           
        <Route path="/invoice" element={<InvoiceDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

