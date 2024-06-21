import React from 'react';
import { Courses } from './courses/Courses'; // Adjust the import path as needed
import { Enrollments } from './enrollments/Enrollments'; // Adjust the import path as needed
import { ListUsers } from './users/ListUsers'; // Adjust the import path as needed
import { Logout } from './auth/Logout'; // Adjust the import path as needed

export const AdminDashboard = () => {
  const handleLogout = () => {
    Logout()
      .then(() => {
        // Perform any additional actions after successful logout (e.g., redirect)
        window.location.href = '/login';
      })
      .catch(error => {
        // Handle any errors here
        console.error('Failed to logout.', error);
        // Optionally, you can redirect to login page even if logout fails
        window.location.href = '/login';
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <Courses />
      <Enrollments />
      <ListUsers />
    </div>
  );
};
