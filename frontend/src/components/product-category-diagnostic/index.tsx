"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  categories: Array<{
    id: string;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface DiagnosticResult {
  totalProducts: number;
  productsWithoutCategories: number;
  categoriesCount: number;
  relationshipsCount: number;
  products: Product[];
  categories: Category[];
}

export default function ProductCategoryDiagnostic() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostic = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Buscar produtos
      const productsResponse = await fetch("/api/products");
      if (!productsResponse.ok) throw new Error("Erro ao buscar produtos");
      const products: Product[] = await productsResponse.json();

      // Buscar categorias
      const categoriesResponse = await fetch("/api/categories");
      if (!categoriesResponse.ok) throw new Error("Erro ao buscar categorias");
      const categories: Category[] = await categoriesResponse.json();

      // Calcular estatísticas
      const productsWithoutCategories = products.filter(
        (p) => p.categories.length === 0,
      ).length;
      const relationshipsCount = products.reduce(
        (sum, p) => sum + p.categories.length,
        0,
      );

      setDiagnostic({
        totalProducts: products.length,
        productsWithoutCategories,
        categoriesCount: categories.length,
        relationshipsCount,
        products: products.slice(0, 10), // Mostrar apenas os primeiros 10
        categories,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateSQLScript = () => {
    if (!diagnostic) return "";

    const productsWithoutCat = diagnostic.products.filter(
      (p) => p.categories.length === 0,
    );

    let sql = `-- Script SQL para corrigir produtos sem categorias\n\n`;

    sql += `-- Total de produtos sem categorias: ${diagnostic.productsWithoutCategories}\n`;
    sql += `-- Produtos que precisam de categorias:\n`;

    productsWithoutCat.forEach((product) => {
      sql += `-- ${product.name} (ID: ${product.id})\n`;
    });

    sql += `\n-- Inserir categorias padrão\n`;
    sql += `INSERT INTO category (id, name, description) VALUES\n`;
    sql += `  ('1f454fe3-d608-414c-a6d2-74e2c78f8087', 'Eletrônicos', 'Produtos eletrônicos diversos'),\n`;
    sql += `  ('a4e1b2c3-d4e5-f6g7-h8i9-j0k1l2m3n4o5', 'Gaming', 'Produtos para jogos'),\n`;
    sql += `  ('b5f2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Informática', 'Hardware e componentes')\n`;
    sql += `ON CONFLICT (id) DO NOTHING;\n\n`;

    sql += `-- Associar produtos automaticamente\n`;
    sql += `INSERT INTO product_categories_category ("productId", "categoryId") VALUES\n`;

    const associations: string[] = [];
    productsWithoutCat.forEach((product) => {
      const categoryId = getCategoryForProduct(product.name);
      if (categoryId) {
        associations.push(
          `  ('${product.id}', '${categoryId}') -- ${product.name}`,
        );
      }
    });

    sql += associations.join(",\n");
    sql += `\nON CONFLICT ("productId", "categoryId") DO NOTHING;`;

    return sql;
  };

  const getCategoryForProduct = (productName: string): string | null => {
    const name = productName.toLowerCase();

    if (
      name.includes("mouse") ||
      name.includes("teclado") ||
      name.includes("monitor") ||
      name.includes("webcam") ||
      name.includes("microfone")
    ) {
      return "1f454fe3-d608-414c-a6d2-74e2c78f8087"; // Eletrônicos
    }

    if (
      name.includes("gamer") ||
      name.includes("gaming") ||
      name.includes("console") ||
      name.includes("controle") ||
      name.includes("cadeira gamer")
    ) {
      return "a4e1b2c3-d4e5-f6g7-h8i9-j0k1l2m3n4o5"; // Gaming
    }

    if (
      name.includes("ssd") ||
      name.includes("hd") ||
      name.includes("processador") ||
      name.includes("placa") ||
      name.includes("memória") ||
      name.includes("fonte")
    ) {
      return "b5f2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"; // Informática
    }

    return "1f454fe3-d608-414c-a6d2-74e2c78f8087"; // Padrão: Eletrônicos
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Diagnóstico de Produtos e Categorias</CardTitle>
          <CardDescription>
            Ferramenta para diagnosticar e corrigir o problema de produtos sem
            categorias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runDiagnostic} disabled={isLoading}>
            {isLoading ? "Executando diagnóstico..." : "Executar Diagnóstico"}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">❌ Erro: {error}</p>
          </CardContent>
        </Card>
      )}

      {diagnostic && (
        <div className="space-y-6">
          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {diagnostic.totalProducts}
                  </div>
                  <div className="text-sm text-gray-600">Total de Produtos</div>
                </div>
                <div className="rounded-lg bg-red-50 p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {diagnostic.productsWithoutCategories}
                  </div>
                  <div className="text-sm text-gray-600">Sem Categorias</div>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {diagnostic.categoriesCount}
                  </div>
                  <div className="text-sm text-gray-600">
                    Categorias Disponíveis
                  </div>
                </div>
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {diagnostic.relationshipsCount}
                  </div>
                  <div className="text-sm text-gray-600">Relacionamentos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produtos Problemáticos */}
          {diagnostic.productsWithoutCategories > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚠️ Produtos sem Categorias
                  <span className="rounded bg-red-500 px-2 py-1 text-sm text-white">
                    {diagnostic.productsWithoutCategories}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {diagnostic.products
                    .filter((p) => p.categories.length === 0)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="rounded-lg border p-3">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">
                          ID: {product.id} | Preço: R$ {product.price} |
                          Estoque: {product.stock}
                        </div>
                      </div>
                    ))}
                  {diagnostic.productsWithoutCategories > 5 && (
                    <p className="text-sm text-gray-500">
                      ... e mais {diagnostic.productsWithoutCategories - 5}{" "}
                      produtos
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Categorias Disponíveis */}
          <Card>
            <CardHeader>
              <CardTitle>🏷️ Categorias Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {diagnostic.categories.map((category) => (
                  <span
                    key={category.id}
                    className="rounded-lg border bg-gray-100 px-3 py-2 text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Script SQL Gerado */}
          {diagnostic.productsWithoutCategories > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>📝 Script SQL de Correção</CardTitle>
                <CardDescription>
                  Execute este script no seu banco de dados para corrigir os
                  problemas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() => copyToClipboard(generateSQLScript())}
                    className="w-full"
                  >
                    📋 Copiar Script SQL
                  </Button>
                  <pre className="max-h-60 overflow-x-auto overflow-y-auto rounded-lg bg-gray-100 p-4 text-sm">
                    {generateSQLScript()}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status OK */}
          {diagnostic.productsWithoutCategories === 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mb-2 text-4xl">✅</div>
                  <div className="font-medium text-green-800">
                    Todos os produtos possuem categorias!
                  </div>
                  <div className="mt-1 text-sm text-green-600">
                    {diagnostic.relationshipsCount} relacionamentos encontrados
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
