import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Itens from '../pages/Itens';
import { PrivateRoute } from './privateRoute';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Itens />
        </PrivateRoute>
      } />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}