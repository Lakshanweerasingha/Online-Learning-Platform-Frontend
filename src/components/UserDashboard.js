import React from 'react';
import { UserEnrollment } from './enrollments/UserEnrollment'; // Adjust the import path as needed
import { CourseUser } from './courses/CourseUser'; // Adjust the import path as needed

export const UserDashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <UserEnrollment />
      <CourseUser />
    </div>
  );
};
