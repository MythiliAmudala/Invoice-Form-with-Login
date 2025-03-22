import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import PDFUploader from "../PDFUploader";
import Header from "../Header";
import { LiaCommentSolid } from "react-icons/lia";
import { FiFileText } from "react-icons/fi";
import { BiBuildings } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const InvoiceDetails = () => {
  const [activeButton, setActiveButton] = useState('$');
  const [leftColor, setLeftColor] = useState('gray');
  const [rightColor, setRightColor] = useState('gray');

  const [formData, setFormData] = useState({
    vendor: "",
    vendorAddress: "550 Main St., Lynn",
    poNumber: "",
    invoiceNumber: "",
    invoiceDate: "",
    totalAmount: "",
    paymentTerms: "",
    invoiceDueDate: "",
    glPostDate: "",
    invoiceDescription: "",
    lineAmount: "",
    department: "",
    account: "",
    location: "",
    comments: "",
  });

  // Refs for scrolling
  const vendorRef = useRef(null);
  const invoiceRef = useRef(null);
  const commentsRef = useRef(null);

  // Handle toggle for $ / % button
  const handleToggle = (type) => {
    setActiveButton(type);
    if (type === '$') {
      setLeftColor('gray');
      setRightColor('blue');
    } else if (type === '%') {
      setLeftColor('blue');
      setRightColor('gray');
    }
  };

  // Handle scrolling to specific sections
  const handleScrollTo = (section) => {
    if (section === "vendor" && vendorRef.current) {
      vendorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "invoice" && invoiceRef.current) {
      invoiceRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "comments" && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Load draft or submitted data from localStorage
  useEffect(() => {
    const draftData = localStorage.getItem("invoiceDraft");
    const submittedData = localStorage.getItem("invoiceSubmitted");

    if (submittedData) {
      try {
        setFormData(JSON.parse(submittedData));
      } catch (error) {
        console.error("Failed to parse submitted data", error);
      }
    } else if (draftData) {
      try {
        setFormData(JSON.parse(draftData));
      } catch (error) {
        console.error("Failed to parse draft data", error);
      }
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Generic function to handle draft or submit actions
  const handleFormAction = (actionType) => {
    if (actionType === "draft") {
      localStorage.setItem("invoiceDraft", JSON.stringify(formData));
      alert("Draft saved successfully!");
    } else if (actionType === "submit") {
      localStorage.setItem("invoiceSubmitted", JSON.stringify(formData));
      localStorage.removeItem("invoiceDraft");
      alert("Invoice data submitted and saved permanently!");
    }
  };

  return (
    <div>
      {/* Header */}
      <Header onTabClick={handleScrollTo} />
  
      <div className="main-container">
        
        {/* Left Section: PDFUploader */}
        <div className="left-section">
          <PDFUploader />
        </div>
  
        {/* Right Section */}
        <div className="right-section">
  
          {/* Vendor Details */}
          <div ref={vendorRef} className="vendor-container">
            <div className="icon-container">
              <BiBuildings className="icons" />
              <h2>Vendor Details</h2>
            </div>
  
            <div className="vendor-info">
              <label>Vendor <span className="required">*</span></label>
              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="vendor-select"
              >
                <option value="">Select Vendor</option>
                <option value="A-1 Exterminators">A-1 Exterminators</option>
                <option value="ABC Solutions">ABC Solutions</option>
                <option value="XYZ Corporation">XYZ Corporation</option>
              </select>
              <p className="vendor-address">{formData.vendorAddress}</p>
              <a href="#" className="view-details">▼ View Vendor Details</a>
            </div>
          </div>
  
          {/* Invoice Details */}
          <div className="invoice-container">
            <div className="icon-container">
              <FiFileText className="icons" />
              <h2>Invoice Details</h2>
            </div>
  
            {/* General Information */}
            <div className="section">
              <h3>General Information</h3>
              <label>Purchase Order Number <span className="required">*</span></label>
              <select
                name="poNumber"
                value={formData.poNumber}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select PO Number</option>
                <option value="PO1234">PO1234</option>
                <option value="PO5678">PO5678</option>
                <option value="PO9101">PO9101</option>
              </select>
            </div>
  
            {/* Invoice Details */}
            <div className="section">
              <h3>Invoice Details</h3>
  
              {/* Invoice Number & Date */}
              <div className="grid-container">
                <div>
                  <label>Invoice Number <span className="required">*</span></label>
                  <select
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Invoice Number</option>
                    <option value="INV-001">INV-001</option>
                    <option value="INV-002">INV-002</option>
                    <option value="INV-003">INV-003</option>
                  </select>
                </div>
  
                <div>
                  <label>Invoice Date <span className="required">*</span></label>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
  
              {/* Total Amount & Payment Terms */}
              <div className="grid-container">
                <div>
                  <label>Total Amount <span className="required">*</span></label>
                  <div className="line-cinput-container">
                    <div className="symbol-icon">$</div>
                    <input
                      type="text"
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                      className="line-input"
                      placeholder="0.00"
                    />
                    <p>USD</p>
                  </div>
                </div>
  
                <div>
                  <label>Payment Terms</label>
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Payment Terms</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Due on Receipt">Due on Receipt</option>
                  </select>
                </div>
              </div>
  
              {/* Invoice Due Date & GL Post Date */}
              <div className="grid-container">
                <div>
                  <label>Invoice Due Date</label>
                  <select
                    name="invoiceDueDate"
                    value={formData.invoiceDueDate}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Due Date</option>
                    <option value="2025-04-01">2025-04-01</option>
                    <option value="2025-04-15">2025-04-15</option>
                    <option value="2025-05-01">2025-05-01</option>
                  </select>
                </div>
  
                <div>
                  <label>GL Post Date</label>
                  <select
                    name="glPostDate"
                    value={formData.glPostDate}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select GL Post Date</option>
                    <option value="2025-03-20">2025-03-20</option>
                    <option value="2025-03-25">2025-03-25</option>
                    <option value="2025-03-30">2025-03-30</option>
                  </select>
                </div>
              </div>
  
              {/* Description */}
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="invoiceDescription"
                  value={formData.invoiceDescription}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
  
            {/* Expense Details */}
            <div className="bg-section-container">
              <h3>Expense Details</h3>
              <div className="expense-header">
                <span>
                  <span style={{ color: leftColor }}>$ 0.00</span> / <span style={{ color: rightColor }}>$ 0.00</span>
                </span>
                <div className="toggle-buttons">
                  <button
                    className={`btn ${activeButton === '$' ? 'active' : ''}`}
                    onClick={() => handleToggle('$')}
                  >
                    $
                  </button>
                  <button
                    className={`btn ${activeButton === '%' ? 'active' : ''}`}
                    onClick={() => handleToggle('%')}
                  >
                    %
                  </button>
                </div>
              </div>
            </div>
  
            <div className="grid-container">
              <div>
                <label>Line Amount</label>
                <div className="line-cinput-container">
                  <div className="symbol-icon">$</div>
                  <input
                    type="text"
                    name="lineAmount"
                    value={formData.lineAmount}
                    onChange={handleChange}
                    className="line-input"
                    placeholder="0.00"
                  />
                  <p>USD</p>
                </div>
              </div>
  
              <div>
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Department</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                </select>
              </div>
            </div>
  
            <div className="ac-ln-container">
              <div className="input-container">
                <label>Account</label>
                <select
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Account</option>
                  <option value="Savings">Savings</option>
                  <option value="Checking">Checking</option>
                  <option value="Business">Business</option>
                </select>
              </div>
  
              <div className="input-container">
                <label>Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field location-box"
                >
                  <option value="">Select Location</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>
            </div>
  
            <div className="add-expense-button-container">
              <button className="add-expense-button">+ Add Expense Coding</button>
            </div>
          </div>
  
          {/* Comments Section */}
          <div ref={commentsRef} className="comments-section">
            <LiaCommentSolid className="icons" />
            <h3>Comments</h3>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="input-field"
              rows="1"
              placeholder="Add a comment and use @Name to tag someone"
            />
          </div>
  
          {/* Buttons */}
          <div className="btn-container">
            <BsThreeDotsVertical className="dots-icon" />
            <button onClick={() => handleFormAction("draft")} className="btn-draft">Save as Draft</button>
            <button onClick={() => handleFormAction("submit")} className="btn-submit submit">Submit & Store</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default InvoiceDetails;
