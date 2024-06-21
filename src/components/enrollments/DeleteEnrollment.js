import React from 'react';
import axios from '../../axios'; // Adjust the import path as needed
import '../Css/enrollments/DeleteEnrollment.css'; // Import your CSS file here

export function DeleteEnrollment({ enrollmentId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/enrollments/${enrollmentId}`);
      onDelete(enrollmentId);
    } catch (error) {
      console.error('Failed to delete enrollment.', error);
    }
  };

  return (
    <button className="delete-enrollment-button" onClick={handleDelete}>
      Delete
    </button>
  );
}
