import React, { useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed
import '../Css/courses/DeleteCourse.css'; // Import your CSS file here

export function DeleteCourse({ courseId, onDelete }) {
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`/courses/${courseId}`);
      onDelete(courseId); // Notify parent component about the deletion
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage('No response received from the server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="delete-course-container">
      <h2>Delete Course</h2>
      <p className="delete-course-text">Are you sure you want to delete this course?</p>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
