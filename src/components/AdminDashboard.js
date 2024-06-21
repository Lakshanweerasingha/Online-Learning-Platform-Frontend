import React from 'react';
import { Courses } from './courses/Courses'; // Adjust the import path as needed
import { Enrollments } from './enrollments/Enrollments'; // Adjust the import path as needed
import { ListUsers } from './users/ListUsers'; // Adjust the import path as needed

export const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Courses />
      <Enrollments />
      <ListUsers />
    </div>
  );
};
