import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('@Tecprime:token');
  });

  function login(token: string) {
    localStorage.setItem('@Tecprime:token', token);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem('@Tecprime:token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);