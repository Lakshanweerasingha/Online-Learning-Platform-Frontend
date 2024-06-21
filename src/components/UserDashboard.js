import React from 'react';
import { UserEnrollment } from './enrollments/UserEnrollment'; // Adjust the import path as needed
import { CourseUser } from './courses/CourseUser'; // Adjust the import path as needed
import { Logout } from './auth/Logout'; // Adjust the import path as needed

export const UserDashboard = () => {
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
              <button onClick={handleLogout}>Logout</button>
         <h2>User Dashboard</h2>
      <UserEnrollment />
      <CourseUser />
      </div>
    );
  };