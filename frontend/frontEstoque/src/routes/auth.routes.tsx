import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import { PrivateRoute } from './privateRoute';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}