import React from 'react';
import axios from '../../axios'; // Adjust import path as needed

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
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}


