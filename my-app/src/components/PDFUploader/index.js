import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TbArrowBarToUp } from "react-icons/tb";
import "./index.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  // Load PDF from local storage on component mount
  useEffect(() => {
    const storedPdf = localStorage.getItem("uploadedPdf");
    if (storedPdf) {
      setFile(storedPdf);
    }
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile && uploadedFile.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfDataUrl = event.target.result;
        localStorage.setItem("uploadedPdf", pdfDataUrl); // Store in local storage
        setFile(pdfDataUrl);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <div className="pdf-wrapper">
      <div className="upload-section">
        <h2>Upload Your Invoice</h2>
        <p>To auto-populate fields and save time</p>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/747/747560.png" 
          alt="link-image" 
          className="image"
        />
        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-btn">
            Upload File <TbArrowBarToUp className="upload-icon" />
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            hidden 
          />
        </div>

        {loading && <p>Loading PDF...</p>}

        {file && (
          <div className="pdf-viewer">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="nav-buttons">
              <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                Prev
              </button>
              <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUploader;
