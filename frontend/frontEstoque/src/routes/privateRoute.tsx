import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

import type { ReactNode } from 'react';

type PrivateRouteProps = {
    children: ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
    const auth = useAuth();
    return auth?.user ? children : <Navigate to="/login" />;
}