import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UploadMenu from './pages/UploadMenu';
import FoodOrdering from './pages/FoodOrdering';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TableBooking from './pages/TableBooking';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Admin Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            {user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          </ProtectedRoute>
        } />
        
        {/* User Protected Routes */}
        <Route path="/book-table" element={
          <ProtectedRoute>
            <TableBooking />
          </ProtectedRoute>
        } />
        
        <Route path="/upload" element={
          <ProtectedRoute>
            <UploadMenu />
          </ProtectedRoute>
        } />
        
        <Route path="/order" element={
          <ProtectedRoute>
            <FoodOrdering />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;

