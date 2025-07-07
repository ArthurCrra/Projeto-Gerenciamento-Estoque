import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/PaginaLogin';
import TabelaItens from '../pages/Iten/TabelaItens';
import TabelaCompras from '../pages/Compra/TabelaCompras';
import TabelaArmazenamento from '../pages/Armazenamento/TabelaArmazenamento';
import TabelaProjetos from '../pages/Projeto/TabelaProjetos'
import TabelaUsuarios from '../pages/Usuario/TabelaUsuarios'
import { PrivateRoute } from './privateRoute';

//Arquivo para configurar todas as rotas do sistema

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tabelaItens" element={
        <PrivateRoute>
          <TabelaItens />
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
      <Route path="/tabelaProjetos" element={
        <PrivateRoute>
          <TabelaProjetos />
        </PrivateRoute>
      } />
      <Route path="/tabelaUsuarios" element={
        <PrivateRoute>
          <TabelaUsuarios />
        </PrivateRoute>
      } />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}