import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Adjust import path as needed
import { EditUser } from './EditUser'; // Adjust import path as needed
import { CreateUser } from './CreateUser'; // Adjust import path as needed
import '../Css/users/ListUsers.css'; // Import your CSS file here

export function ListUsers() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editUserId, setEditUserId] = useState(null); // State to track which user to edit
  const [showCreateForm, setShowCreateForm] = useState(false); // State to control create user form visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data.users);
      } catch (error) {
        handleErrorResponse(error);
      }
    };

    fetchUsers();
  }, []);

  const handleErrorResponse = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setEditUserId(null); // Close the edit form after update
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm); // Toggle create user form visibility
  };

  const handleCreateUser = async (newUser) => {
    try {
      // Perform API call to create user with newUser data
      // Example: const response = await axios.post('/users', newUser);
      // Upon success, update state or perform necessary actions
      // For demo, let's assume adding user to state directly:
      setUsers([...users, newUser]);
      setShowCreateForm(false); // Close create user form after success
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="users-actions">
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="create-user-button" onClick={handleToggleCreateForm}>Create User</button>

      {showCreateForm && (
        <CreateUser
          onUserCreated={handleCreateUser}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {editUserId && (
        <EditUser
          key={editUserId} // Ensure component re-renders when editUserId changes
          userId={editUserId}
          onUpdate={handleUserUpdated}
        />
      )}
    </div>
  );
}
