"use client";

import { getStarRating } from "@/helper/rating";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Label } from "../ui/label"; // Ainda podemos usar Label para semântica

// Interfaces para os dados do produto (atualizadas com hex para cores)
interface Color {
  name: string;
  value: string;
  hex?: string; // Adicionado para cores visuais
}

interface Size {
  name: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  mainImage: string;
  galleryImages: string[];
  colors: Color[];
  sizes: Size[];
}

interface ProductFormData {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

// Mock de dados atualizado para refletir o layout da imagem
const MOCK_PRODUCT: Product = {
  id: "123",
  name: "Classic Graphic T-Shirt",
  price: 260.0,
  rating: 4.8,
  description:
    "Made from a soft and breathable cotton-blend, this classic graphic tee combines comfort with style. Featuring a unique graphic print, it's perfect for casual wear. Available in multiple colors and sizes to suit your preference.",
  mainImage: "https://picsum.photos/id/1/600/700", // Imagem principal maior
  galleryImages: [
    "https://picsum.photos/id/10/100/120",
    "https://picsum.photos/id/20/100/120",
    "https://picsum.photos/id/30/100/120",
    "https://picsum.photos/id/40/100/120",
  ],
  colors: [
    { name: "Verde Militar", value: "military-green", hex: "#4B5320" },
    { name: "Grafite", value: "graphite", hex: "#36454F" },
    { name: "Branco", value: "white", hex: "#F5F5DC" }, // Cor clara, adicionei um pouco mais escuro para ser visível
    { name: "Azul Marinho", value: "navy", hex: "#000080" },
  ],
  sizes: [
    { name: "PP", value: "PP" },
    { name: "P", value: "P" },
    { name: "M", value: "M" },
    { name: "G", value: "G" },
    { name: "GG", value: "GG" },
  ],
};

const MOCK_REVIEWS = {
  averageRating: 4.5,
  totalReviews: 150,
  ratingsBreakdown: {
    5: 100,
    4: 30,
    3: 10,
    2: 5,
    1: 5,
  },
};

export const DetailsProducts = ({
  product = MOCK_PRODUCT,
}: {
  product?: Product;
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">(
    "details",
  );

  const { register, handleSubmit, control, setValue, watch } =
    useForm<ProductFormData>({
      defaultValues: {
        selectedColor: product.colors[0]?.value || "",
        selectedSize: product.sizes[0]?.value || "",
        quantity: 1,
      },
    });

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log("Adicionando ao carrinho:", {
      productId: product.id,
      ...data,
    });
    alert(
      `Produto adicionado ao carrinho: \nCor: ${data.selectedColor}\nTamanho: ${data.selectedSize}\nQuantidade: ${data.quantity}`,
    );
  };

  // Watch para a quantidade para poder incrementar/decrementar
  const currentQuantity = watch("quantity");

  const handleQuantityChange = (type: "increment" | "decrement") => {
    let newQuantity = currentQuantity;
    if (type === "increment" && currentQuantity < 10) {
      // Limite máximo de 10
      newQuantity = currentQuantity + 1;
    } else if (type === "decrement" && currentQuantity > 1) {
      // Limite mínimo de 1
      newQuantity = currentQuantity - 1;
    }
    setValue("quantity", newQuantity, { shouldValidate: true });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500">
        <ol className="inline-flex list-none p-0">
          <li className="flex items-center">
            <Link href="#" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="#" className="hover:underline">
              Shop
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href="#" className="hover:underline">
              T-Shirts
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center text-gray-700">{product.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Lado Esquerdo: Imagens do Produto */}
        <div className="flex w-full flex-col items-center lg:w-1/2">
          <div className="mb-4 w-full">
            <Image
              src={product.mainImage}
              alt={product.name}
              width={600}
              height={700}
              layout="responsive" // Para responsividade
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Miniaturas */}
          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-sm lg:max-w-md"
          >
            <CarouselContent className="-ml-2">
              {" "}
              {/* Ajuste de margem para espaçamento */}
              {product.galleryImages.map((imgSrc, index) => (
                <CarouselItem key={index + 1} className="basis-1/4 pl-2">
                  <div className="cursor-pointer rounded-md border border-gray-200 p-1 transition-colors duration-200 hover:border-blue-500">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          src={imgSrc}
                          alt={`${product.name} - imagem ${index + 1}`}
                          width={100}
                          height={120}
                          objectFit="cover"
                          className="rounded-sm"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />{" "}
            {/* Posição dos botões do carousel */}
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>

        {/* Lado Direito: Detalhes e Opções do Produto */}
        <div className="w-full p-4 lg:w-1/2 lg:p-0">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>
          <div className="mb-4 flex items-baseline">
            <p className="mr-2 text-xl font-bold text-gray-800">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            {/* Exemplo de preço riscado para desconto */}
            <p className="mr-4 text-sm text-gray-500 line-through">$299.00</p>
            <span className="text-sm font-semibold text-red-600">-15%</span>
          </div>

          <div className="mb-6 flex items-center">
            <span className="text-yellow-400">{getStarRating(5)}</span>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.toFixed(1)}/5 (
              {Math.floor(Math.random() * 200) + 50} Avaliações)
            </span>
          </div>

          <p className="mb-8 leading-relaxed text-gray-700">
            {product.description}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* -- SELEÇÃO DE COR (Chips) -- */}
            <div>
              <Label
                htmlFor="color"
                className="mb-2 block text-base font-semibold text-gray-800"
              >
                Cor:{" "}
                <span className="font-normal text-gray-600">
                  {watch("selectedColor")}
                </span>
              </Label>
              <div className="mt-2 flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      setValue("selectedColor", color.value, {
                        shouldValidate: true,
                      })
                    }
                    className={`h-8 w-8 rounded-full border-2 transition-all duration-200 ease-in-out ${
                      watch("selectedColor") === color.value
                        ? "border-blue-600 ring-2 ring-blue-300" // Estilo quando selecionado
                        : "border-gray-300 hover:border-gray-400"
                    } ${color.value === "white" ? "bg-white" : ""} // Para cor branca`}
                    style={{ backgroundColor: color.hex || color.value }}
                    aria-label={`Selecionar cor ${color.name}`}
                  >
                    {/* Para cores claras, pode adicionar uma borda escura interna para contraste */}
                    {color.value === "white" &&
                      watch("selectedColor") !== color.value && (
                        <div className="h-full w-full rounded-full border border-gray-200 opacity-70"></div>
                      )}
                    {color.value === "white" &&
                      watch("selectedColor") === color.value && (
                        <div className="h-full w-full rounded-full border border-gray-400 opacity-70"></div>
                      )}
                  </button>
                ))}
              </div>
            </div>

            {/* -- SELEÇÃO DE TAMANHO (Chips) -- */}
            <div>
              <Label
                htmlFor="size"
                className="mb-2 block text-base font-semibold text-gray-800"
              >
                Tamanho:{" "}
                <span className="font-normal text-gray-600">
                  {watch("selectedSize")}
                </span>
              </Label>
              <div className="mt-2 flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() =>
                      setValue("selectedSize", size.value, {
                        shouldValidate: true,
                      })
                    }
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${
                      watch("selectedSize") === size.value
                        ? "border-gray-900 bg-gray-900 text-white" // Estilo quando selecionado
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                    } `}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* -- QUANTIDADE -- */}
            <div className="flex items-center justify-between gap-4 md:gap-8">
              <div>
                <Label
                  htmlFor="quantity"
                  className="mb-2 block text-base font-semibold text-gray-800"
                >
                  Quantidade
                </Label>
                <div className="flex w-32 items-center rounded-md border border-gray-300">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange("decrement")}
                    className="rounded-l-md px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={currentQuantity <= 1}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="text" // Usar text para evitar setas do navegador, mas tratar como number
                    readOnly // Não permitir digitação direta se for só botões
                    value={currentQuantity}
                    {...register("quantity", { valueAsNumber: true })}
                    className="w-full border-r border-l border-gray-300 py-2 text-center focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange("increment")}
                    className="rounded-r-md px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={currentQuantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <Button type="submit" className="mt-8 flex flex-1 rounded-full">
                Adicionar ao Carrinho
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* Aqui você adicionaria outras seções como "Product Details", "Reviews", "You Might Also Like" */}
      
      {/* TODO: REMOVER DEPOIS */}
      <div className="mt-5 rounded-lg bg-yellow-50 p-6 text-center text-sm text-yellow-800">
        <strong className="font-semibold">Nota:</strong> Esta é uma página de
        detalhes de produto simulada para fins de demonstração. As imagens e
        dados são fictícios.
      </div>
      <div className="flex justify-around border-b-2 border-gray-200 pt-6 pb-6 text-center text-gray-700">
        <div>
          <button
            type="button"
            className="m-0 cursor-pointer border-none bg-transparent p-0 text-inherit"
            onClick={() => setActiveTab("details")}
            aria-pressed={activeTab === "details"}
          >
            Product Details
          </button>
        </div>
        <div>
          <button
            type="button"
            className="m-0 cursor-pointer border-none bg-transparent p-0 font-semibold text-inherit"
            onClick={() => setActiveTab("reviews")}
            aria-pressed={activeTab === "reviews"}
          >
            Rating & Reviews
          </button>
        </div>
        <div>
          <button
            type="button"
            className="m-0 cursor-pointer border-none bg-transparent p-0 text-inherit"
            onClick={() => setActiveTab("faqs")}
            aria-pressed={activeTab === "faqs"}
          >
            FAQs
          </button>
        </div>
      </div>
      <div className="mt-6">
        {activeTab === "details" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Product Details
            </h2>
            <p className="text-gray-700">
              Here are the detailed specifications and features of the product.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nunc ut laoreet facilisis, nunc nisl aliquam nunc, eget
              aliquam nisl nunc euismod nunc.
            </p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Rating & Reviews
            </h2>
            <p className="text-gray-700">
              Average Rating: {MOCK_REVIEWS.averageRating} / 5 from{" "}
              {MOCK_REVIEWS.totalReviews} reviews.
            </p>
            {/* Aqui você pode adicionar mais detalhes sobre a distribuição das avaliações */}
          </div>
        )}
        {activeTab === "faqs" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">FAQs</h2>
            <p className="text-gray-700">
              Here are some frequently asked questions about the product. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
              nunc ut laoreet facilisis, nunc nisl aliquam nunc, eget aliquam
              nisl nunc euismod nunc.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
