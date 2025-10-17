'use client';

import { api } from "@/helper/axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
export interface Product {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    categories: { id: string; name: string }[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
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
      filtered = filtered.filter((product) =>
        product.data.categories?.some(
          (cat) => cat.name.toLowerCase() === filters.category?.toLowerCase(),
        ),
      );
    }

    // Filtro por faixa de preço
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.data.price >= filters.priceRange!.min &&
          product.data.price <= filters.priceRange!.max,
      );
    }

    // Nota: Filtro por rating removido pois não existe no backend

    // Filtro por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.data.name.toLowerCase().includes(searchLower) ||
          product.data.description?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [products, filters]);

  // Calcular total de páginas
  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length, itemsPerPage],
  );

  // Função para buscar produtos da API
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get("/product");

      // A API retorna { data: [...] }, então acessamos response.data.data
      const productsArray = response.data.data;

      // Verificar se é um array
      if (!Array.isArray(productsArray)) {
        throw new TypeError(
          `Resposta inesperada da API. Esperava array em data.data, recebeu: ${typeof productsArray}`,
        );
      }

      // Mapear os dados do backend para a estrutura esperada pelo frontend
      const mappedProducts = productsArray.map((productData: any) => ({
        data: productData,
      }));

      setProducts(mappedProducts);
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
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}

export function fetchProductById(id: string): Promise<Product | undefined> {
  return api
    .get(`/product/${id}`)
    .then((response) => ({ data: response.data }))
    .catch(() => undefined);
}

// Função utilitária para encontrar produto por ID em uma lista de produtos
export function getProductById(
  products: Product[],
  productId: string,
): Product | undefined {
  return products.find((product) => product.data.id === productId);
}

// Hook customizado para obter um produto por ID do contexto
export function useProductById(productId: string): Product | undefined {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProductById must be used within a ProductsProvider");
  }
  return context.products.find((product) => product.data.id === productId);
}
