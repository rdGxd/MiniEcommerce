"use client";

import { Button } from "@/components/ui/button";

interface FilterPanelProps {
  readonly priceRange: number;
  readonly onPriceChange: (value: number | string) => void;
  readonly onClearFilters: () => void;
  readonly isMobile?: boolean;
}

export function FilterPanel({
  priceRange,
  onPriceChange,
  onClearFilters,
  isMobile = false,
}: FilterPanelProps) {
  return (
    <div
      className={`${isMobile ? "mt-20 block md:hidden" : "hidden md:block"} w-full`}
    >
      <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Filtros</h2>

        {/* Filtro de Preço */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Preço Máximo</h3>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>R$ 0</span>
              <span>R$ {priceRange}</span>
              <span>R$ 1000</span>
            </div>
          </div>
        </div>

        {/* Botão Limpar Filtros */}
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}
