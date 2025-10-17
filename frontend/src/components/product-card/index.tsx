import { Product } from "@/contexts/ProductsContext";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  readonly product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  // Verificação de segurança
  if (!product?.data) {
    return (
      <div className="w-full rounded-2xl border bg-gray-100 p-4">
        <div className="text-center text-gray-500">Produto não encontrado</div>
      </div>
    );
  }

  const handleClick = () => {
    router.push(`/products/details/${product.data.id}`);
  };

  return (
    <button
      type="button"
      key={product.data.id}
      className="w-full cursor-pointer rounded-2xl border bg-white p-4 text-left hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onClick={handleClick}
    >
      <img
        src={product.data.imageUrl}
        alt={product.data.name}
        className="h-auto w-full rounded-lg object-cover"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.data.name}</h3>
      <p className="text-sm text-gray-600">{product.data.description}</p>
      <div className="mb-2 text-sm text-gray-500">
        Estoque: {product.data.stock} unidades
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">R$ {product.data.price}</p>
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
