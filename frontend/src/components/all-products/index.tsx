"use client";

import { FilterIcon } from "lucide-react";
import { useMemo, useState } from "react";
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

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Produto A",
    image: "https://picsum.photos/200/300?random=1",
    price: 199.99,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Produto B",
    image: "https://picsum.photos/200/300?random=2",
    price: 299.99,
    rating: 4.0,
  },
  {
    id: 3,
    name: "Produto C",
    image: "https://picsum.photos/200/300?random=3",
    price: 399.99,
    rating: 3.5,
  },
  {
    id: 4,
    name: "Produto D",
    image: "https://picsum.photos/200/300?random=4",
    price: 499.99,
    rating: 5.0,
  },
  {
    id: 5,
    name: "Produto E",
    image: "https://picsum.photos/200/300?random=5",
    price: 599.99,
    rating: 4.2,
  },
  {
    id: 6,
    name: "Produto F",
    image: "https://picsum.photos/200/300?random=6",
    price: 699.99,
    rating: 3.8,
  },
  {
    id: 7,
    name: "Produto G",
    image: "https://picsum.photos/200/300?random=7",
    price: 799.99,
    rating: 4.7,
  },
  {
    id: 8,
    name: "Produto H",
    image: "https://picsum.photos/200/300?random=8",
    price: 899.99,
    rating: 4.1,
  },
  {
    id: 9,
    name: "Produto I",
    image: "https://picsum.photos/200/300?random=9",
    price: 999.99,
    rating: 3.9,
  },
  {
    id: 10,
    name: "Produto J",
    image: "https://picsum.photos/200/300?random=10",
    price: 1099.99,
    rating: 4.3,
  },
  {
    id: 11,
    name: "Produto K",
    image: "https://picsum.photos/200/300?random=11",
    price: 1199.99,
    rating: 4.6,
  },
  {
    id: 12,
    name: "Produto L",
    image: "https://picsum.photos/200/300?random=12",
    price: 1299.99,
    rating: 4.0,
  },
];
const MOCK_STYLES = [
  {
    id: 1,
    name: "Casual",
  },
  {
    id: 2,
    name: "Esportivo",
  },
  {
    id: 3,
    name: "Formal",
  },
  {
    id: 4,
    name: "Vintage",
  },
  {
    id: 5,
    name: "Moderno",
  },
  { id: 6, name: "Boêmio" },
];

const MOCK_COLORS = [
  { id: 1, name: "Vermelho", hex: "#FF0000" },
  { id: 2, name: "Azul", hex: "#0000FF" },
  { id: 3, name: "Verde", hex: "#00FF00" },
  { id: 4, name: "Amarelo", hex: "#FFFF00" },
  { id: 5, name: "Preto", hex: "#000000" },
  { id: 6, name: "Branco", hex: "#FFFFFF" },
];

const MOCK_SIZES = [
  { id: 1, name: "PP" },
  { id: 2, name: "P" },
  { id: 3, name: "M" },
  { id: 4, name: "G" },
  { id: 5, name: "GG" },
];

const PRODUCTS_PER_PAGE = 8; // Quantos produtos por página

export default function AllProducts() {
  // --- ESTADO CENTRALIZADO ---
  const [activeFilter, setActiveFilter] = useState(false); // Visibilidade do filtro no mobile

  // Estados para cada filtro
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);

  // --- LÓGICA DE FILTRAGEM E PAGINAÇÃO ---

  // useMemo otimiza a performance, refazendo o cálculo apenas quando um filtro muda
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Lógica de filtro de preço
      if (product.price > priceRange) return false;
      // Lógica de filtro de avaliação
      if (selectedRating && product.rating < selectedRating) return false;
      // Adicione aqui filtros de estilo e cor quando seus produtos tiverem esses dados
      // Ex: if (selectedStyles.length > 0 && !selectedStyles.includes(product.styleId)) return false;
      return true;
    });
  }, [priceRange, selectedRating, selectedStyles, selectedColor]);

  // Cálculo da paginação com base nos produtos JÁ filtrados
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Função para limpar todos os filtros
  const handleClearFilters = () => {
    setSelectedStyles([]);
    setPriceRange(1000);
    setSelectedRating(null);
    setSelectedColor(null);
    setCurrentPage(1); // Volta para a primeira página
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-[280px_1fr] lg:p-8">
      {/* Coluna de Filtros */}

      {activeFilter && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 md:static md:hidden md:bg-transparent md:p-0">
          <div className="h-full overflow-y-auto">
            <FilterPanel
              priceRange={priceRange}
              onPriceChange={(value) => setPriceRange(Number(value))}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              onClearFilters={handleClearFilters}
              selectedColor={MOCK_COLORS}
              selectedStyles={MOCK_STYLES}
              selectedSizes={MOCK_SIZES}
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
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        onClearFilters={handleClearFilters}
        selectedColor={MOCK_COLORS}
        isMobile={activeFilter}
        selectedStyles={MOCK_STYLES}
        selectedSizes={MOCK_SIZES}
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
              <ProductCard key={product.id} product={product} />
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
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages).keys()].map((page) => (
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
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
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
