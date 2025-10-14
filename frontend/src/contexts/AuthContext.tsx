'use client';

import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, userData?: User) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!user;

  const login = useCallback((accessToken: string, refreshToken: string, userData?: User) => {
    // Salvar tokens nos cookies
    Cookies.set('accessToken', accessToken, {
      expires: 7, // 7 dias
      secure: true,
      sameSite: 'strict'
    });
    Cookies.set('refreshToken', refreshToken, {
      expires: 30, // 30 dias
      secure: true,
      sameSite: 'strict'
    });

    // Se temos dados do usuário, usar eles, senão decodificar do token
    if (userData) {
      setUser(userData);
    } else {
      // Aqui você pode decodificar o JWT para extrair os dados do usuário
      // Por enquanto, vou usar dados básicos
      setUser({ id: '1', email: 'user@example.com' });
    }
  }, []);

  const logout = useCallback(() => {
    // Remover tokens dos cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    // Limpar estado do usuário
    setUser(null);
  }, []);

  const refreshTokenFn = useCallback(async (): Promise<boolean> => {
    try {
      const refreshTokenValue = Cookies.get('refreshToken');
      if (!refreshTokenValue) return false;

      // Aqui você faria a requisição para renovar o token
      // const response = await api.post('/auth/refresh', { refreshToken: refreshTokenValue });

      // TODO: Implementar lógica real de refresh token
      console.warn('Refresh token logic not implemented yet');
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout(); // Se não conseguir renovar, faz logout
      return false;
    }
  }, [logout]);  // Verificar se o usuário está logado ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get('accessToken');

      if (accessToken) {
        // Aqui você pode decodificar o JWT ou fazer uma requisição para validar
        // Por enquanto, vou apenas definir um usuário básico
        setUser({ id: '1', email: 'user@example.com' });
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const value: AuthContextType = useMemo(() => ({
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    refreshToken: refreshTokenFn,
  }), [user, isLoggedIn, isLoading, login, logout, refreshTokenFn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
