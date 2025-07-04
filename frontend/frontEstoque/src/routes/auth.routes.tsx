import { Routes, Route } from 'react-router-dom';
import Login from '../pages/PaginaLogin';
import Itens from '../pages/TabelaItens';
import TabelaCompras from '../pages/TabelaCompras';
import TabelaArmazenamento from '../pages/TabelaArmazenamento';
import { PrivateRoute } from './privateRoute';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tabelaItens" element={
        <PrivateRoute>
          <Itens />
        </PrivateRoute>
      } />
      <Route path="/tabelaCompras" element={
        <PrivateRoute>
          <TabelaCompras />
        </PrivateRoute>
      } />
      <Route path="/tabelaArmazenamento" element={
        <PrivateRoute>
          <TabelaArmazenamento />
        </PrivateRoute>
      } />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}