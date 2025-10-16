import { Product } from "@/contexts/ProductsContext";
import { getStarRating } from "@/helper/rating";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/details/${product.id}`);
  };

  return (
    <button
      type="button"
      key={product.id}
      className="w-full cursor-pointer rounded-2xl border bg-white p-4 text-left hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onClick={handleClick}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-auto w-full rounded-lg object-cover"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-sm">{getStarRating(product.rating ?? 0)}</div>
        <span className="text-sm text-gray-600">{product.rating}/5</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">R$ {product.price}</p>
        <span>
          <button
            className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            tabIndex={-1}
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </span>
      </div>
    </button>
  );
}
