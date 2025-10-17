"use client";

import { useProducts } from "@/contexts/ProductsContext";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { FilterPanel } from "../filter-panel";
import { ProductCard } from "../product-card";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";



export default function AllProducts() {
  // --- CONTEXTO DE PRODUTOS ---
  const {
    products,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    isLoading,
    error,
  } = useProducts();

  // --- ESTADO LOCAL ---
  const [activeFilter, setActiveFilter] = useState(false); // Visibilidade do filtro no mobile

  // Estados locais para os filtros
  const [priceRange, setPriceRange] = useState(1000);

  // --- LÓGICA DE FILTROS E PAGINAÇÃO ---

  // Verificação de segurança: garantir que products é um array
  const safeProducts = Array.isArray(products) ? products : [];

  // Filtrar produtos baseado nos filtros locais
  const filteredProducts = safeProducts.filter((product) => {
    const priceFilter = product.data.price <= priceRange;
    return priceFilter;
  });

  // Calcular produtos da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Função para limpar todos os filtros
  const handleClearFilters = () => {
    setPriceRange(1000);
    setCurrentPage(1);
  };

  // Estado de loading
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">
            Erro ao carregar produtos: {error}
          </p>
          <Button onClick={() => globalThis.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-[280px_1fr] lg:p-8">
      {/* Coluna de Filtros */}

      {activeFilter && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 md:static md:hidden md:bg-transparent md:p-0">
          <div className="h-full overflow-y-auto">
            <FilterPanel
              priceRange={priceRange}
              onPriceChange={(value) => setPriceRange(Number(value))}
              onClearFilters={handleClearFilters}
              isMobile
            />
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setActiveFilter(false)}
              >
                Fechar Filtros
              </Button>
            </div>
          </div>
        </div>
      )}

      <FilterPanel
        priceRange={priceRange}
        onPriceChange={(value) => setPriceRange(Number(value))}
        onClearFilters={handleClearFilters}
        isMobile={activeFilter}
      />

      {/* Coluna de Produtos */}
      <main>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Produtos</h1>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setActiveFilter(!activeFilter)}
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>
        <p className="mb-4 text-gray-600">
          Exibindo {currentProducts.length} de {filteredProducts.length}{" "}
          produtos
        </p>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product.data.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center">
              Nenhum produto encontrado com esses filtros.
            </p>
          )}
        </div>

        {/* Paginação */}
        <div className="col-span-full mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>
              {[...new Array(totalPages).keys()].map((page) => (
                <PaginationItem key={page + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page + 1);
                    }}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
