import { getStarRating } from "@/helper/rating";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const MOCK_STYLES = [
  { id: 1, name: "Casual" },
  { id: 2, name: "Esportivo" },
  { id: 3, name: "Formal" },
  { id: 4, name: "Vintage" },
  { id: 5, name: "Boho" },
  { id: 6, name: "Chic" },
  { id: 7, name: "Streetwear" },
  { id: 8, name: "Preppy" },
  { id: 9, name: "Gótico" },
  { id: 10, name: "Minimalista" },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Produto 1",
    price: 10.0,
    description: "Descrição do Produto 1",
    image: "https://picsum.photos/id/50/300/350",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Produto 2",
    price: 20.0,
    description: "Descrição do Produto 2",
    image: "https://picsum.photos/id/100/300/350",
    rating: 4.0,
  },
  {
    id: 3,
    name: "Produto 3",
    price: 30.0,
    description: "Descrição do Produto 3",
    image: "https://picsum.photos/id/200/300/350",
    rating: 3.5,
  },
  {
    id: 4,
    name: "Produto 4",
    price: 40.0,
    description: "Descrição do Produto 4",
    image: "https://picsum.photos/id/300/300/350",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Produto 5",
    price: 50.0,
    description: "Descrição do Produto 5",
    image: "https://picsum.photos/id/400/300/350",
    rating: 4.2,
  },
  {
    id: 6,
    name: "Produto 6",
    price: 60.0,
    description: "Descrição do Produto 6",
    image: "https://picsum.photos/id/500/300/350",
    rating: 4.0,
  },
  {
    id: 7,
    name: "Produto 7",
    price: 70.0,
    description: "Descrição do Produto 7",
    image: "https://picsum.photos/id/600/300/350",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Produto 8",
    price: 80.0,
    description: "Descrição do Produto 8",
    image: "https://picsum.photos/id/700/300/350",
    rating: 4.1,
  },
  {
    id: 9,
    name: "Produto 9",
    price: 90.0,
    description: "Descrição do Produto 9",
    image: "https://picsum.photos/id/800/300/350",
    rating: 3.9,
  },
  {
    id: 10,
    name: "Produto 10",
    price: 100.0,
    description: "Descrição do Produto 10",
    image: "https://picsum.photos/id/900/300/350",
    rating: 4.7,
  },
];

export default function AllProducts() {
  return (
    <div className="p-2 md:p-4 lg:p-8">
      <nav className="mb-6 text-sm">
        <ol className="inline-flex list-none p-0">
          <li className="flex items-center">
            <Link href="#" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
          </li>
          <li className="flex items-center">
            <Link href="#" className="font-semibold hover:underline">
              Casual
            </Link>
          </li>
        </ol>
      </nav>
      <div className="flex items-center justify-around p-2 text-center">
        <h1 className="text-4xl font-bold">{MOCK_STYLES[0].name} </h1>
        <p className="text-gray-600">
          Exibindo 10 produtos no total de {MOCK_PRODUCTS.length}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="m-2 w-48 rounded-2xl border p-2">
            <img
              src={product.image}
              alt={product.name}
              className="h-auto w-full"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm">{getStarRating(product.rating)}</p>
              <span className="text-gray-600">{product.rating}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">R$ {product.price.toFixed(2)}</p>
              <button className="rounded bg-blue-500 px-2 py-1 text-white">
                <ShoppingCartIcon className="inline h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <div className="col-span-2 mt-4 flex justify-center md:col-span-3 lg:col-span-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
