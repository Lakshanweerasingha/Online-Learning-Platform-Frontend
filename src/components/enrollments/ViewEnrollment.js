import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

export function ViewEnrollment({ enrollmentId, onClose }) {
  const [enrollment, setEnrollment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const response = await axios.get(`/enrollments/${enrollmentId}`);
        setEnrollment(response.data);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    };

    fetchEnrollment();
  }, [enrollmentId]);

  return (
    <div>
      <h2>Enrollment Details</h2>
      {enrollment ? (
        <div>
          <p>User: {enrollment.user.name}</p>
          <p>Course: {enrollment.course.name}</p>
          <button onClick={onClose}>Close</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
