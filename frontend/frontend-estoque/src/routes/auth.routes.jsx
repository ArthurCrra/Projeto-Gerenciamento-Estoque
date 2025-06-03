import {Routes, Route, Navigate} from 'react-router-dom'

import {Login} from '../pages/Login';
import {Projetos} from '../pages/Projetos';




export function AuthRoutes() {
 return (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projetos" element={<Projetos />} />
    </Routes>
 )
}
