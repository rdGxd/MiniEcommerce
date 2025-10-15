'use client';

import { api } from "@/helper/axios";
import Cookie from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filtrar produtos baseado nos filtros aplicados
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por categoria
    if (filters.category) {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === filters.category?.toLowerCase(),
      );
    }

    // Filtro por faixa de preço
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange!.min &&
          product.price <= filters.priceRange!.max,
      );
    }

    // Filtro por rating
    if (filters.rating) {
      filtered = filtered.filter(
        (product) => (product.rating || 0) >= filters.rating!,
      );
    }

    // Filtro por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [products, filters]);

  // Calcular total de páginas
  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length, itemsPerPage],
  );

  // Função para buscar produtos (mock por enquanto)
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Substituir por chamada real à API
      const token = Cookie.get("accessToken");

      const response = await api.get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar produtos",
      );
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

  const value: ProductsContextType = useMemo(
    () => ({
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
    }),
    [
      products,
      filteredProducts,
      filters,
      isLoading,
      error,
      currentPage,
      totalPages,
      itemsPerPage,
      refreshProducts,
    ],
  );

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
