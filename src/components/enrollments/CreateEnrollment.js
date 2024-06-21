import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed
import '../Css/enrollments/CreateEnrollment.css'; // Import your CSS file here

export function CreateEnrollment({ onEnrollmentCreated }) {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, coursesResponse] = await Promise.all([
          axios.get('/users'),
          axios.get('/courses')
        ]);

        setUsers(usersResponse.data.users || []);
        setCourses(coursesResponse.data || []); // Assuming coursesResponse.data is an array of courses
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchData();
  }, []);

  const handleApiError = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else if (error.request) {
      setErrorMessage('No response received from the server. Please try again later.');
    } else {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/enrollments', {
        user_id: selectedUser,
        course_id: selectedCourse
      });
      onEnrollmentCreated(response.data.enrollment);
      setSelectedUser('');
      setSelectedCourse('');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="create-enrollment-container">
      <h2>Create Enrollment</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <button className="create-enrollment-button" type="submit">
          Create Enrollment
        </button>
      </form>
    </div>
  );
}
