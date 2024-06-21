import React, { useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

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
    <div>
      <h2>Delete Course</h2>
      <p>Are you sure you want to delete this course?</p>
      <button onClick={handleDelete}>Delete</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

