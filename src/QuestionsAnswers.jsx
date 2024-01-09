// Import the necessary React components
import React, { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import "./App.css"

// Define a functional component for the UI
const QuestionsAnswers = () => {
  // Use the useState hook to track the visibility of the answers
  const [showAnswers, setShowAnswers] = useState(false);

  // Handle the click event on the "Answers" button
  const handleClick = () => {
    setShowAnswers(!showAnswers);
  };

  // Render the UI
  return (
    <div>
      <h1>Questions? We have answers.</h1>

      <Image src="https://i.imgur.com/MK3eW3As.jpg" alt="Questions? We have answers." />

      <Button onClick={handleClick}>{showAnswers ? 'Hide Answers' : 'Show Answers'}</Button>

      {showAnswers && (
        <ul>
          <li>How do I convert a PNG image to a pdf document?</li>
          <li>Why should I convert PNG images to PDF format?</li>
          <li>How do I save a PNG as a high-quality PDF document?</li>
          <li>How do I merge multiple PNG files into one PDF file?</li>
          <li>What other types of image file formats work with the Acrobat PDF converter?</li>
        </ul>
      )}
    </div>
  );
};

// Export the component
export default QuestionsAnswers;
