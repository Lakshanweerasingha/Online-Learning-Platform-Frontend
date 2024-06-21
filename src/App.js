import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { Courses } from './components/courses/Courses';
import { CreateCourse } from './components/courses/CreateCourse';
import { UpdateCourse } from './components/courses/UpdateCourse';
import { DeleteCourse } from './components/courses/DeleteCourse';
import { ListUsers } from './components/users/ListUsers';
import { CreateUser } from './components/users/CreateUser';
import { EditUser } from './components/users/EditUser';
import { Enrollments } from './components/enrollments/Enrollments';
import { CreateEnrollment } from './components/enrollments/CreateEnrollment';
import { UpdateEnrollment } from './components/enrollments/UpdateEnrollment';
import { DeleteEnrollment } from './components/enrollments/DeleteEnrollment';
import { UserEnrollment } from './components/enrollments/UserEnrollment';
import './App.css'; // Import your CSS file for additional styling

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleLoginSignupClick = () => {
    setShowWelcome(false);
  };

  const backgroundStyle = {
    backgroundColor: '#cddff4', // Light blue background color
    minHeight: '100vh', // Ensures the background color covers the entire viewport height
    position: 'relative', // Ensures the positioning context for absolute or fixed elements
    padding: '20px', // Adds padding around the content
    display: 'flex', // Enables flexbox layout
    justifyContent: 'center', // Centers content horizontally
    alignItems: 'center', // Centers content vertically
  };

  const buttonStyle = {
    marginRight: '10px', // Adds margin between buttons
  };

  return (
    <Router>
      <div className="App" style={backgroundStyle}>
        <header className="App-header">
          {showWelcome && (
            <>
              <h1>Welcome to Online Learning Platform</h1>
              <nav>
                <ul>
                  <li>
                    <Link to="/login" className="button-link" style={buttonStyle} onClick={handleLoginSignupClick}>Login</Link>
                  </li>
                  <li>
                    <Link to="/signup" className="button-link" style={buttonStyle} onClick={handleLoginSignupClick}>Signup</Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </header>
        <main className="App-main">
          {showWelcome && (
            <h2 style={{ textAlign: 'center' }}>Welcome! Please Login or Signup to continue.</h2>
          )}
          {!showWelcome && (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route path="/courses/:id/update" element={<UpdateCourse />} />
              <Route path="/courses/:id/delete" element={<DeleteCourse />} />
              <Route path="/users" element={<ListUsers />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/:id/edit" element={<EditUser />} />
              <Route path="/enrollments" element={<Enrollments />} />
              <Route path="/enrollments/create" element={<CreateEnrollment />} />
              <Route path="/enrollments/:id/update" element={<UpdateEnrollment />} />
              <Route path="/enrollments/:id/delete" element={<DeleteEnrollment />} />
              <Route path="/user/:id/enrollments" element={<UserEnrollment />} />
              {/* Add more routes as needed */}
            </Routes>
          )}
        </main>
        <footer className="App-footer">
        </footer>
      </div>
    </Router>
  );
}

export default App;
