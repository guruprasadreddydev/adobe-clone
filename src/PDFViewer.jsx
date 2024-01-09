import React, { useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

function PDFViewer() {
  useEffect(() => {
    const fileInput = document.getElementById("pdfFileInput");

    // Function to create a WebViewer instance for a specific container element
    function createWebViewerInstance(containerId, initialDoc) {
      WebViewer(
        {
          path: "@pdftron/webviewer",
          initialDoc: initialDoc,
        },
        document.getElementById(containerId)
      );
    }

    // Function to handle file selection
    function handleFileSelect() {
      const viewerContainer = document.getElementById("viewer");
      viewerContainer.innerHTML = ""; // Clear previous instance

      const newViewerContainer = document.createElement("div");
      const newContainerId = "viewer-" + Date.now(); // Generate a unique ID
      newViewerContainer.id = newContainerId;
      viewerContainer.appendChild(newViewerContainer);

      createWebViewerInstance(newContainerId, fileInput.files[0]);
    }

    // Add an event listener for the file input
    fileInput.addEventListener("change", handleFileSelect);

    // Initial WebViewer instance
    createWebViewerInstance("viewer", ""); // Use a unique ID for the initial instance too
  }, []);

  return (
    <div className="App">
      <h1>PDF Viewer</h1>
      <input
        type="file"
        id="pdfFileInput"
        accept=".pdf"
        style={{ marginBottom: "10px" }}
      />
      <div id="viewer" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}

export default PDFViewer;
