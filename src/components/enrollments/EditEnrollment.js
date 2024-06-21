import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

export function EditEnrollment({ enrollmentId, onUpdate, onCancel }) {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    course_id: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollmentResponse = await axios.get(`/enrollments/${enrollmentId}`);
        const usersResponse = await axios.get('/users');
        const coursesResponse = await axios.get('/courses');
        setFormData({
          user_id: enrollmentResponse.data.user_id,
          course_id: enrollmentResponse.data.course_id,
        });
        setUsers(usersResponse.data.users);
        setCourses(coursesResponse.data.courses);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    };

    fetchData();
  }, [enrollmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/enrollments/${enrollmentId}`, formData);
      onUpdate(response.data.enrollment);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Edit Enrollment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select name="user_id" value={formData.user_id} onChange={handleChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Course:</label>
          <select name="course_id" value={formData.course_id} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
