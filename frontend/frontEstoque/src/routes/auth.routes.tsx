import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/PaginaLogin';
import Itens from '../pages/Iten/TabelaItens';
import TabelaCompras from '../pages/Compra/TabelaCompras';
import TabelaArmazenamento from '../pages/Armazenamento/TabelaArmazenamento';
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