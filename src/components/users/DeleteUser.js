import React from 'react';
import axios from '../../axios'; // Adjust import path as needed
import '../Css/users/DeleteUser.css'; // Import your CSS file here

export function DeleteUser({ userId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${userId}`);
      onDelete(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="delete-user-container">
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
