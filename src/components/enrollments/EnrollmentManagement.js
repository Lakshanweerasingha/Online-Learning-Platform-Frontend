import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Adjust import path as needed
import { Link } from 'react-router-dom';

export function EnrollmentManagement() {
  const [enrollments, setEnrollments] = useState([]); // Initialize enrollments state as an empty array
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('/enrollments');
        setEnrollments(response.data.enrollments); // Assuming the API response has an enrollments array
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h1>Enrollments</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.id}</td>
              <td>{enrollment.user.name}</td>
              <td>{enrollment.course.name}</td>
              <td>
                <Link to={`/enrollments/${enrollment.id}/view`}>View</Link>
                <Link to={`/enrollments/${enrollment.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/enrollments/create">Create Enrollment</Link>
    </div>
  );
}
