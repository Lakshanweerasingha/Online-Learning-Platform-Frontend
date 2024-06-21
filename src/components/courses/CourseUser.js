import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

export function CourseUser() {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/courses');
        setCourses(response.data); // Assuming response.data is an array of courses
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

    fetchData();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
