import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileImage, Loader2, CheckCircle2 } from 'lucide-react';
import './UploadMenu.css';

const UploadMenu = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setProcessing(true);
    
    // Simulate AI processing of the menu image
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      setTimeout(() => {
        navigate('/order');
      }, 1500);
    }, 3000);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="upload-container animate-fade-in">
      <div className="upload-header">
        <h1>Upload Hotel Menu</h1>
        <p>Our AI will extract the items and generate your ordering system</p>
      </div>

      <div className="upload-card glass-panel">
        {!file ? (
          <div 
            className={`drop-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file-upload" 
              accept="image/*" 
              onChange={handleChange} 
              className="file-input"
            />
            <label htmlFor="file-upload" className="drop-zone-content">
              <div className="icon-container">
                <UploadCloud size={48} color="var(--primary-color)" />
              </div>
              <h3>Drag & drop your menu image</h3>
              <p>or click to browse from your device</p>
              <span className="file-hint">Supports: JPG, PNG, WEBP</span>
            </label>
          </div>
        ) : (
          <div className="processing-state">
            {processing ? (
              <>
                <div className="pulse-circle">
                  <FileImage size={40} color="var(--primary-color)" />
                </div>
                <h3>Processing Menu...</h3>
                <p>Extracting categories and items using AI</p>
                <div className="loader-container">
                  <Loader2 className="spinner" size={24} />
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              </>
            ) : completed ? (
              <div className="success-state animate-fade-in">
                <CheckCircle2 size={64} color="var(--success-color)" className="success-icon" />
                <h3>Menu Processed Successfully!</h3>
                <p>Generating your food ordering system...</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMenu;
