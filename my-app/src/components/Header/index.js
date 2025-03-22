import React, { useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Header = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState('vendor'); // Active tab state
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate('/');
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabClick(tab);
  };

  return (
    <div className="navbar">
      <div className="logout-container">
        <button onClick={handleLogout} className="log-btn">
          <VscArrowLeft />
        </button>
        <h2>Create New Invoice</h2>
      </div>

      <div className="tabs">
        <button 
          onClick={() => handleTabClick('vendor')} 
          className={`tab-btn ${activeTab === 'vendor' ? 'active' : ''}`}
        >
          Vendor Details
        </button>
        
        <button 
          onClick={() => handleTabClick('invoice')} 
          className={`tab-btn ${activeTab === 'invoice' ? 'active' : ''}`}
        >
          Invoice Details
        </button>
        
        <button 
          onClick={() => handleTabClick('comments')} 
          className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
        >
          Comments
        </button>
      </div>
    </div>
  );
};

export default Header;
