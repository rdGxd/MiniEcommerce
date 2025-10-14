'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ProductsProvider } from '@/contexts/ProductsContext';

interface AppProviderProps {
  readonly children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          {children}
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  );
}
