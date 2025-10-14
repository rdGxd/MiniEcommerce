'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_COST = 5.00;
const TAX_RATE = 0.1; // 10%

export function CartProvider({ children }: { readonly children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calcular valores derivados
  const itemCount = useMemo(() =>
    items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(() =>
    items.reduce((total, item) => total + (item.price * item.quantity), 0),
    [items]
  );

  const shipping = useMemo(() =>
    subtotal > 0 ? SHIPPING_COST : 0,
    [subtotal]
  );

  const tax = useMemo(() =>
    subtotal * TAX_RATE,
    [subtotal]
  );

  const total = useMemo(() =>
    subtotal + shipping + tax,
    [subtotal, shipping, tax]
  );

  // Adicionar item ao carrinho
  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);

      if (existingItemIndex >= 0) {
        // Se o item já existe, aumenta a quantidade
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Se é um novo item, adiciona com quantidade 1
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  }, []);

  // Remover item do carrinho
  const removeItem = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  }, []);

  // Atualizar quantidade de um item
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Limpar carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Persistir carrinho no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setItems(parsedCart);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
      setIsLoading(false);
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoading]);

  const value: CartContextType = useMemo(() => ({
    items,
    itemCount,
    total,
    subtotal,
    shipping,
    tax,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
  }), [
    items,
    itemCount,
    total,
    subtotal,
    shipping,
    tax,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
