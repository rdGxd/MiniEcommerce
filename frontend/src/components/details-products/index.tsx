"use client";

import { useProductById } from "@/contexts/ProductsContext";
import { getStarRating } from "@/helper/rating";
import { CircleCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

// Adiciona interface que corresponde ao Product presente no ProductsContext
interface ContextProduct {
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

// Mock de dados atualizado para refletir o layout da imagem
const MOCK_PRODUCT: Product = {
  id: "123",
  name: "Classic Graphic T-Shirt",
  price: 260,
  rating: 4.8,
  description:
    "Made from a soft and breathable cotton-blend, this classic graphic tee combines comfort with style. Featuring a unique graphic print, it's perfect for casual wear. Available in multiple colors and sizes to suit your preference.",
  mainImage: "https://picsum.photos/200/300?random=1", // Imagem principal maior
  galleryImages: [
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
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

// Mock de detalhes do produto (especificações)
const MOCK_PRODUCT_DETAILS = [
  {
    title: "Material",
    content:
      "Composição: 60% algodão, 40% poliéster. Malha macia e respirável, ideal para uso diário.",
  },
  {
    title: "Instruções de Lavagem",
    content:
      "Lavar à máquina em água fria. Não usar alvejante. Secar à sombra e passar em temperatura baixa.",
  },
  {
    title: "Dimensões",
    content:
      "O modelo da foto usa tamanho M e mede 1,82m. Consulte a tabela de medidas para escolher o tamanho ideal.",
  },
  {
    title: "Garantia",
    content:
      "Garantia de 30 dias contra defeitos de fabricação. Não cobre danos por uso indevido.",
  },
];

// Mock de reviews detalhados
const MOCK_REVIEWS_LIST = [
  {
    id: "r1",
    name: "Samantha D.",
    rating: 5,
    verified: true,
    date: "2025-09-10",
    text: "Adorei a camiseta! O tecido é super confortável e o caimento ficou perfeito. Recomendo.",
  },
  {
    id: "r2",
    name: "Carlos M.",
    rating: 4,
    verified: false,
    date: "2025-08-22",
    text: "Boa qualidade, mas a cor ficou um pouco diferente do anúncio. Ainda assim vale a compra.",
  },
  {
    id: "r3",
    name: "Ana P.",
    rating: 5,
    verified: true,
    date: "2025-07-30",
    text: "Entrega rápida e produto conforme descrito. Atendimento excelente.",
  },
];

// Mock de FAQs
const MOCK_FAQS = [
  {
    q: "Qual o prazo de entrega?",
    a: "O prazo de entrega depende da sua região. Normalmente entre 3 a 7 dias úteis para capitais.",
  },
  {
    q: "Posso trocar o tamanho?",
    a: "Sim — aceitamos trocas em até 30 dias após o recebimento, desde que o produto esteja nas condições originais.",
  },
  {
    q: "As cores do produto no site são fiéis à realidade?",
    a: "Fazemos o possível para reproduzir as cores, mas pode haver pequenas variações dependendo da tela do dispositivo.",
  },
];

export const DetailsProducts = ({ productId }: { productId: string }) => {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">(
    "details",
  );

  // ALTERAÇÃO: usa o hook customizado para obter o produto do contexto
  const product = useProductById(productId);

  // Função que mapeia ContextProduct | undefined para o Product completo usado pelo componente
  const mapToDetailProduct = (ctx?: ContextProduct): Product => {
    if (!ctx?.data) return MOCK_PRODUCT;
    return {
      id: ctx.data.id,
      name: ctx.data.name,
      price: ctx.data.price,
      rating: MOCK_PRODUCT.rating, // fallback: usar rating do mock
      description: ctx.data.description,
      mainImage: ctx.data.imageUrl,
      galleryImages: [ctx.data.imageUrl, ...MOCK_PRODUCT.galleryImages],
      colors: MOCK_PRODUCT.colors, // fallback: usar cores do mock (o contexto atual não fornece)
      sizes: MOCK_PRODUCT.sizes, // fallback: usar tamanhos do mock
    };
  };

  // Derivado seguro para usar em JSX (sempre tem todos os campos)
  const detail = mapToDetailProduct(product);

  // Inicializar o formulário com valores do MOCK_PRODUCT (não acessar product indefinido)
  const { register, handleSubmit, setValue, watch } = useForm<ProductFormData>({
    defaultValues: {
      selectedColor: MOCK_PRODUCT.colors[0]?.value || "",
      selectedSize: MOCK_PRODUCT.sizes[0]?.value || "",
      quantity: 1,
    },
  });

  // Quando o produto do contexto chegar, atualizamos os valores do form
  useEffect(() => {
    const d = mapToDetailProduct(product);
    setValue("selectedColor", d.colors[0]?.value || "");
    setValue("selectedSize", d.sizes[0]?.value || "");
    setValue("quantity", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log("Adicionando ao carrinho:", {
      productId: detail.id,
      ...data,
    });
    alert(
      `Produto adicionado ao carrinho: \nCor: ${data.selectedColor}\nTamanho: ${data.selectedSize}\nQuantidade: ${data.quantity}`,
    );
  };

  // Watch para a quantidade para poder incrementar/decrementar
  const currentQuantity = watch("quantity");

  // Número de avaliações: inicializamos com um valor determinístico para
  // evitar mismatch entre render server/client. Depois, atualizamos no
  // cliente (useEffect) se quisermos mostrar um valor "aleatório".
  const [reviewsCount, setReviewsCount] = useState<number>(
    MOCK_REVIEWS.totalReviews,
  );

  useEffect(() => {
    // Atualiza somente no cliente — assim o HTML inicial (servidor) bate com
    // o HTML do cliente na hidratação. A mudança acontece após a hidratação.
    const rnd = Math.floor(Math.random() * 200) + 50;
    setReviewsCount(rnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <span className="mx-2">&gt;</span>
          </li>
          <li className="flex items-center">
            <Link href="#" className="hover:underline">
              Shop
            </Link>
            <span className="mx-2">&gt;</span>
          </li>
          <li className="flex items-center">
            <Link href="#" className="hover:underline">
              T-Shirts
            </Link>
            <span className="mx-2">&gt;</span>
          </li>
          {/* USO ALTERADO: usar detail (sempre definido) */}
          <li className="flex items-center text-gray-700">{detail.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Lado Esquerdo: Imagens do Produto */}
        <div className="flex w-full flex-col items-center lg:w-1/2">
          <div className="mb-4 w-full">
            <Image
              src={detail.mainImage}
              alt={detail.name}
              width={600}
              height={700}
              className="h-auto w-full rounded-lg object-cover shadow-md"
            />
          </div>
          {/* Miniaturas */}
          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-sm lg:max-w-md"
          >
            <CarouselContent className="-ml-2">
              {detail.galleryImages.map((imgSrc, index) => (
                <CarouselItem key={index + 1} className="basis-1/4 pl-2">
                  <div className="cursor-pointer rounded-md border border-gray-200 p-1 transition-colors duration-200 hover:border-blue-500">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          src={imgSrc}
                          alt={`${detail.name} - imagem ${index + 1}`}
                          width={100}
                          height={120}
                          className="rounded-sm object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>

        {/* Lado Direito: Detalhes e Opções do Produto */}
        <div className="w-full p-4 lg:w-1/2 lg:p-0">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
            {detail.name}
          </h1>
          <div className="mb-4 flex items-baseline">
            <p className="mr-2 text-xl font-bold text-gray-800">
              {detail.price.toLocaleString("pt-BR", {
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
              {detail.rating.toFixed(1)}/5 ({reviewsCount} Avaliações)
            </span>
          </div>

          <p className="mb-8 leading-relaxed text-gray-700">
            {detail.description}
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
                {detail.colors.map((color) => (
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
                        ? "border-blue-600 ring-2 ring-blue-300"
                        : "border-gray-300 hover:border-gray-400"
                    } ${color.value === "white" ? "bg-white" : ""}`}
                    style={{ backgroundColor: color.hex || color.value }}
                    aria-label={`Selecionar cor ${color.name}`}
                  >
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
                {detail.sizes.map((size) => (
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
                        ? "border-gray-900 bg-gray-900 text-white"
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
            <div className="space-y-4 text-gray-700">
              {MOCK_PRODUCT_DETAILS.map((item) => (
                <div key={item.title}>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Avaliações
            </h2>

            <div className="mb-4 flex items-center gap-4">
              <div className="text-yellow-400">
                {getStarRating(MOCK_REVIEWS.averageRating)}
              </div>
              <div className="text-sm text-gray-600">
                {MOCK_REVIEWS.totalReviews} avaliações
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              {MOCK_REVIEWS_LIST.map((r) => (
                <article key={r.id} className="rounded-md border p-4">
                  <header className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <strong>{r.name}</strong>
                      {r.verified && (
                        <span className="flex items-center text-green-600">
                          <CircleCheckIcon className="h-4 w-4" />
                          <span className="sr-only">verificado</span>
                        </span>
                      )}
                    </div>
                    <time className="text-sm text-gray-500">{r.date}</time>
                  </header>
                  <div className="mb-2">{getStarRating(r.rating)}</div>
                  <p className="text-sm">{r.text}</p>
                </article>
              ))}

              <div className="flex justify-center">
                <Button className="cursor-pointer rounded-2xl bg-blue-500 text-white hover:bg-blue-600">
                  Carregar mais avaliações
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "faqs" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">FAQs</h2>
            <dl className="space-y-4 text-gray-700">
              {MOCK_FAQS.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-gray-900">{f.q}</dt>
                  <dd className="text-sm">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
      <div className="mt-10">
        <h3 className="flex items-center justify-center text-4xl font-bold text-gray-900">
          You Might Also Like
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {/* Aqui você pode mapear produtos relacionados ou recomendados */}
          <Card className="max-w-xs">
            <CardContent className="p-4">
              <Image
                src="https://picsum.photos/id/50/300/350?random=6"
                alt="Produto Relacionado 1"
                width={300}
                height={350}
                className="mb-4 rounded-md object-cover"
              />
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                Produto Relacionado 1
              </h4>
              <p className="text-sm text-gray-700">
                Descrição breve do produto relacionado.
              </p>
              <p className="mt-2 font-bold text-gray-800">R$199,00</p>
            </CardContent>
          </Card>
          <Card className="max-w-xs">
            <CardContent className="p-4">
              <Image
                src="https://picsum.photos/id/60/300/350?random=7"
                alt="Produto Relacionado 2"
                width={300}
                height={350}
                className="mb-4 rounded-md object-cover"
              />
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                Produto Relacionado 2
              </h4>
              <p className="text-sm text-gray-700">
                Descrição breve do produto relacionado.
              </p>
              <p className="mt-2 font-bold text-gray-800">R$249,00</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
