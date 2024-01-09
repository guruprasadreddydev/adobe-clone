import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "./PNGtoPDFConverter.css";

import initialImage from "./asserts/png2pdf.png";

function PNGtoPDFConverter() {
  const [pdfData, setPdt] = useState([]);
  const [progress, setProgress] = useState(-1);
  const [displayedImage,setDisplayedImage] = useState(initialImage)
  const dropAreaRef = useRef(null)

  const convertToPDF =() =>{
    if(pdfData.length>0){
      setProgress(0)
      const pdf = new jsPDF("p")
    }
  }

  return <div>

  </div>;
}
export default PNGtoPDFConverter;
