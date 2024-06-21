import React, { useState, useEffect } from 'react';
import axios from '../../axios'; // Adjust the import path as needed
import '../Css/courses/UpdateCourse.css'; // Import your CSS file here

export function UpdateCourse({ courseId, onUpdate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/courses/${courseId}`);
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchCourse();
  }, [courseId]);

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
      const response = await axios.put(`/courses/${courseId}`, {
        name,
        description,
      });
      onUpdate({ id: courseId, name, description }); // Notify parent component about the update
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="update-course-container">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="update-button" type="submit">Update</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
