import {Routes, Route, Navigate} from 'react-router-dom'

import {Login} from '../pages/Login';
import { Dashboard } from '../pages/Dashboards';




export function AuthRoutes() {
 return (
   <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
 )
}
