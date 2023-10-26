import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./PNGtoPDFConverter.css";

import initialImage from "./asserts/png2pdf.png";

function PNGtoPDFConverter() {
  const [pdfData, setPDFData] = useState([]);
  const [progress, setProgress] = useState(-1);
  const [displayedImage, setDisplayedImage] = useState(initialImage);
  const dropAreaRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((dataURLs) => {
        setPDFData(dataURLs);
        if (dataURLs.length > 0) {
          setDisplayedImage(dataURLs[0]);
        }
      });
    }
  };

  const convertToPDF = () => {
    if (pdfData.length > 0) {
      setProgress(0);
      const pdf = new jsPDF("p", "mm", "a4");
      let currentProgress = 0;
      const totalProgress = 100;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= totalProgress) {
          clearInterval(interval);
          pdf.save("converted.pdf");
          setProgress(-1);
        }
        setProgress(currentProgress);
      }, 500);

      const addImagesToPDF = (index) => {
        if (index < pdfData.length) {
          const dataURL = pdfData[index];
          const img = new Image();
          img.src = dataURL;
          img.onload = () => {
            const imgWidth = 180;
            const imgHeight = (img.height * imgWidth) / img.width;
            if (index > 0) {
              pdf.addPage();
            }
            pdf.addImage(dataURL, "PNG", 10, 10, imgWidth, imgHeight);
            addImagesToPDF(index + 1);
          };
        }
      };

      addImagesToPDF(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const promises = Array.from(files).map((file) => {
        if (file.type === "image/png") {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve(event.target.result);
            };
            reader.readAsDataURL(file);
          });
        }
        return null;
      });

      const filteredData = promises.filter((data) => data !== null);

      Promise.all(filteredData).then((dataURLs) => {
        setPDFData(dataURLs);
        if (dataURLs.length > 0) {
          setDisplayedImage(dataURLs[0]);
        }
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDivClick = () => {
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="card" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="card-header" style={{ backgroundColor: "#3498db" }}>
        <h1 className="text-center" style={{ color: "#ffffff" }}>
          PNG to PDF Converter
        </h1>
      </div>
      <div className="card-body">
        <div
          id="image-container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          ref={dropAreaRef}
          className="drop-area"
          onClick={handleDivClick}
        >
          {pdfData.length > 0 ? (
            pdfData.map((dataURL, index) => (
              <img
                key={index}
                src={dataURL}
                alt={`Selected Image ${index + 1}`}
                className="responsive-image"
              />
            ))
          ) : (
            <img
              src={displayedImage}
              alt="Displayed Image"
              className="responsive-image"
            />
          )}
          <p
            className="text-center highlighted-text"
            style={{ color: "#3498db" }}
          >
            Drag and drop images here or
          </p>
          <label
            className="text-center file-label highlighted-text"
            htmlFor="imageInput"
            style={{ color: "#3498db" }}
          >
            Select images from your device
          </label>
          <input
            id="imageInput"
            type="file"
            accept=".png"
            style={{ display: "none" }}
            multiple
            onChange={handleImageUpload}
          />
        </div>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#3498db", color: "#ffffff" }}
          onClick={convertToPDF}
        >
          Convert to PDF
        </button>
        {progress >= 0 && (
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%`, backgroundColor: "#3498db" }}
            >
              {`${progress}%`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PNGtoPDFConverter;
