import { getStarRating } from "@/helper/rating";
import { ShoppingCartIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
}

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div key={product.id} className="w-full rounded-2xl border p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-auto w-full rounded-lg object-cover"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-sm">{getStarRating(product.rating)}</div>
        <span className="text-sm text-gray-600">{product.rating}/5</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">R$ {product.price.toFixed(2)}</p>
        <button className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
          <ShoppingCartIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
