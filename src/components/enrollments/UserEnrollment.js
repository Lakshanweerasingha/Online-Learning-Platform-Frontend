import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

export function UserEnrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEnrollments = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setErrorMessage('User not found. Please log in again.');
        return;
      }
      try {
        const response = await axios.get(`/users/${user.id}/enrollments`, {
         
        });
        setEnrollments(response.data.enrollments || []);
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

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h1>My Enrollments</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.id}</td>
              <td>{enrollment.course.name}</td>
              <td>{enrollment.course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
