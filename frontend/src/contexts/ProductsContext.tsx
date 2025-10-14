'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  description?: string;
  stock?: number;
  category?: string;
}

export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  search?: string;
}

interface ProductsContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilter;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setFilters: (filters: ProductFilter) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// Mock de produtos para desenvolvimento
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Produto A',
    imageUrl: 'https://picsum.photos/200/300?random=1',
    price: 199.99,
    rating: 4.5,
    description: 'Descrição do Produto A',
    stock: 10,
    category: 'electronics',
  },
  {
    id: '2',
    name: 'Produto B',
    imageUrl: 'https://picsum.photos/200/300?random=2',
    price: 299.99,
    rating: 4.0,
    description: 'Descrição do Produto B',
    stock: 5,
    category: 'clothing',
  },
  {
    id: '3',
    name: 'Produto C',
    imageUrl: 'https://picsum.photos/200/300?random=3',
    price: 399.99,
    rating: 3.5,
    description: 'Descrição do Produto C',
    stock: 8,
    category: 'electronics',
  },
  {
    id: '4',
    name: 'Produto D',
    imageUrl: 'https://picsum.photos/200/300?random=4',
    price: 499.99,
    rating: 5.0,
    description: 'Descrição do Produto D',
    stock: 3,
    category: 'home',
  },
  {
    id: '5',
    name: 'Produto E',
    imageUrl: 'https://picsum.photos/200/300?random=5',
    price: 599.99,
    rating: 4.2,
    description: 'Descrição do Produto E',
    stock: 15,
    category: 'clothing',
  },
];

export function ProductsProvider({ children }: { readonly children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filtrar produtos baseado nos filtros aplicados
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    // Filtro por faixa de preço
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange!.min &&
        product.price <= filters.priceRange!.max
      );
    }

    // Filtro por rating
    if (filters.rating) {
      filtered = filtered.filter(product =>
        (product.rating || 0) >= filters.rating!
      );
    }

    // Filtro por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [products, filters]);

  // Calcular total de páginas
  const totalPages = useMemo(() =>
    Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length, itemsPerPage]
  );

  // Função para buscar produtos (mock por enquanto)
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Substituir por chamada real à API
      // const response = await api.get('/products');
      // setProducts(response.data);

      setProducts(MOCK_PRODUCTS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  // Carregar produtos na inicialização
  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  // Resetar para primeira página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const value: ProductsContextType = useMemo(() => ({
    products,
    filteredProducts,
    filters,
    isLoading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    setFilters,
    setCurrentPage,
    setItemsPerPage,
    refreshProducts,
  }), [
    products,
    filteredProducts,
    filters,
    isLoading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    refreshProducts,
  ]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
