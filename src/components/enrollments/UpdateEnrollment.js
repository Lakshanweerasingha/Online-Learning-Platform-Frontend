import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

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
        setUsers(usersResponse.data);
        setCourses(coursesResponse.data);
        setUserId(enrollmentResponse.data.user_id);
        setCourseId(enrollmentResponse.data.course_id);
      } catch (error) {
        setErrorMessage('Failed to load data.');
      }
    };
    fetchData();
  }, [enrollmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/enrollments/${enrollmentId}`, { user_id: userId, course_id: courseId });
      onUpdate(response.data);
    } catch (error) {
      setErrorMessage('Failed to update enrollment.');
    }
  };

  return (
    <div>
      <h2>Update Enrollment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
