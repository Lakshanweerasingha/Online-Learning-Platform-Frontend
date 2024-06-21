import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Adjust the import path as needed
import '../Css/enrollments/UpdateEnrollment.css'; // Import your CSS file here

export function UpdateEnrollment({ enrollmentId, onUpdate }) {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, coursesResponse, enrollmentResponse] = await Promise.all([
          axios.get('/users'),
          axios.get('/courses'),
          axios.get(`/enrollments/${enrollmentId}`)
        ]);

        setUsers(usersResponse.data.users || []);
        setCourses(coursesResponse.data || []);

        setUserId(enrollmentResponse.data.user_id);
        setCourseId(enrollmentResponse.data.course_id);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchData();
  }, [enrollmentId]);

  const handleApiError = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else if (error.request) {
      setErrorMessage('No response received from the server. Please try again later.');
    } else {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/enrollments/${enrollmentId}`, { user_id: userId, course_id: courseId });
      onUpdate(response.data);
      setErrorMessage('');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="update-enrollment-container">
      <h2>Update Enrollment</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Course:</label>
          <select value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Update Enrollment</button>
      </form>
    </div>
  );
}
