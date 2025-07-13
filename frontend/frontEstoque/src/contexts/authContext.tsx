import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  user: any;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  async function login(email: string, senha: string) {
    const response = await import('../services/authService').then((m) =>
      m.login(email, senha)
    );
    setUser(response);
    sessionStorage.setItem('user', JSON.stringify(response));
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
