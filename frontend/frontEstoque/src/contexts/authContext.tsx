import { createContext, useState, useContext} from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  user: any;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  async function login(email: string, senha: string) {
    const response = await import('../services/authService').then((m) =>
      m.login(email, senha)
    );
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}