"use client";

import { Button } from "@/components/ui/button";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface FilterPanelProps {
  readonly priceRange: number;
  readonly onPriceChange: (value: number | string) => void;
  readonly selectedRating: number | null;
  readonly onRatingChange: (rating: number | null) => void;
  readonly onClearFilters: () => void;
  readonly selectedColor: Color[];
  readonly isMobile?: boolean;
  readonly selectedStyles: { id: number; name: string }[];
  readonly selectedSizes: { id: number; name: string }[];
}

export function FilterPanel({
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
  selectedColor,
  selectedSizes,
  selectedStyles,
  isMobile = false,
}: FilterPanelProps) {
  // Função auxiliar para avaliação
  const handleRatingClick = (star: number) => {
    // Se clicar na mesma estrela, desmarca (valor nulo)
    const newRating = selectedRating === star ? null : star;
    onRatingChange(newRating);
  };

  return (
    <>
      {isMobile && (
        <div className="mt-20 block md:hidden">
          <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Filtros</h2>

            {/* Filtro de Estilos */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Estilos</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedStyles.map((style) => (
                <button
                  key={style.id}
                  className={`rounded border px-3 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    selectedStyles.includes(style) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    onClearFilters();
                    onRatingChange(null);
                    onPriceChange(1000);
                  }}
                >
                  {style.name}
                </button>
              ))}
            </div>

            {/* Filtro de Preço */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Preço até</h3>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange}
              onChange={(e) => onPriceChange(e.currentTarget.value)}
              onMouseUp={(e) => onPriceChange(e.currentTarget.value)}
              onTouchEnd={(e) => onPriceChange(e.currentTarget.value)}
              className="w-full"
            />
            <div className="text-center font-medium">R$ {priceRange}</div>

            {/* Filtro de Avaliação */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Avaliações</h3>
            {[5, 4, 3, 2, 1].map((star) => (
              <Button
                key={star}
                variant={selectedRating === star ? "default" : "outline"}
                onClick={() => handleRatingClick(star)}
                className="mb-2 w-full"
              >
                {star} Estrelas & Acima
              </Button>
            ))}

            {/* Filtro de Cores */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Cores</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedColor.map((color) => (
                <button
                  key={color.id}
                  className={`h-8 w-8 rounded-full border-2 ${
                    selectedColor?.includes(color)
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => {
                    onClearFilters(); // Limpa outros filtros ao selecionar uma cor
                    onRatingChange(null); // Limpa avaliação ao selecionar uma cor
                    onPriceChange(1000); // Reseta o preço ao selecionar uma cor
                  }}
                />
              ))}
            </div>

            {/* Filtro de Tamanhos */}
            <div>
              <h3>Tamanhos</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedSizes.map((size) => (
                  <button
                    key={size.id}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => {
                      onClearFilters();
                      onRatingChange(null);
                      onPriceChange(1000);
                    }}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full"
                onClick={onClearFilters}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <aside className="hidden sm:w-full md:sticky md:top-4 md:block md:w-64 lg:w-72">
          <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Filtros</h2>

            {/* Filtro de Estilos */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Estilos</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedStyles.map((style) => (
                <button
                  key={style.id}
                  className={`rounded border px-3 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    selectedStyles.includes(style) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    onClearFilters();
                    onRatingChange(null);
                    onPriceChange(1000);
                  }}
                >
                  {style.name}
                </button>
              ))}
            </div>

            {/* Filtro de Preço */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Preço até</h3>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange}
              onChange={(e) => onPriceChange(e.currentTarget.value)}
              onMouseUp={(e) => onPriceChange(e.currentTarget.value)}
              onTouchEnd={(e) => onPriceChange(e.currentTarget.value)}
              className="w-full"
            />
            <div className="text-center font-medium">R$ {priceRange}</div>

            {/* Filtro de Avaliação */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Avaliações</h3>
            {[5, 4, 3, 2, 1].map((star) => (
              <Button
                key={star}
                variant={selectedRating === star ? "default" : "outline"}
                onClick={() => handleRatingClick(star)}
                className="mb-2 w-full"
              >
                {star} Estrelas & Acima
              </Button>
            ))}

            {/* Filtro de Cores */}
            <h3 className="mt-4 mb-2 text-lg font-semibold">Cores</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedColor.map((color) => (
                <button
                  key={color.id}
                  className={`h-8 w-8 rounded-full border-2 ${
                    selectedColor?.includes(color)
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => {
                    onClearFilters(); // Limpa outros filtros ao selecionar uma cor
                    onRatingChange(null); // Limpa avaliação ao selecionar uma cor
                    onPriceChange(1000); // Reseta o preço ao selecionar uma cor
                  }}
                />
              ))}
            </div>

            {/* Filtro de Tamanhos */}
            <div>
              <h3>Tamanhos</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedSizes.map((size) => (
                  <button
                    key={size.id}
                    className="rounded border px-3 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => {
                      onClearFilters(); // Limpa outros filtros ao selecionar um tamanho
                      onRatingChange(null); // Limpa avaliação ao selecionar um tamanho
                      onPriceChange(1000); // Reseta o preço ao selecionar um tamanho
                    }}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full"
                onClick={onClearFilters}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
