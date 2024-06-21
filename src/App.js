import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Courses } from './components/courses/Courses';
import { CreateCourse } from './components/courses/CreateCourse';
import { UpdateCourse } from './components/courses/UpdateCourse';
import { DeleteCourse } from './components/courses/DeleteCourse';
import { ListUsers } from './components/users/ListUsers';
import { CreateUser } from './components/users/CreateUser';
import { EditUser } from './components/users/EditUser';

import { EnrollmentManagement } from './components/enrollments/EnrollmentManagement';
import { CreateEnrollment } from './components/enrollments/CreateEnrollment';
import { EditEnrollment } from './components/enrollments/EditEnrollment';
import { ViewEnrollment } from './components/enrollments/ViewEnrollment';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My App</h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/courses/:id/delete" element={<DeleteCourse />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/:id/edit" element={<EditUser />} />

            <Route path="/enrollments" element={<EnrollmentManagement />} />
            <Route path="/enrollments/create" element={<CreateEnrollment />} />
            <Route path="/enrollments/:id/edit" element={<EditEnrollment />} />
            <Route path="/enrollments/:id/view" element={<ViewEnrollment />} />

            {/* Add more routes as needed */}
          </Routes>
        </main>
        <footer className="App-footer">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
