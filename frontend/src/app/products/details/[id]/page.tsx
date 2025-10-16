import { DetailsProducts } from "@/components/details-products";

type Params = {
  id: string;
};

interface Props {
  readonly params: Params;
}

// Função necessária para export estático com páginas dinâmicas
export async function generateStaticParams(): Promise<Params[]> {
  try {
    // Busca todos os produtos da API
    const response = await fetch("http://localhost:3001/product");

    if (!response.ok) {
      console.warn("Falha ao buscar produtos da API, usando fallback");
      // Fallback caso a API não esteja disponível durante o build
      return [{ id: "123" }];
    }

    const products: Array<{ id: string }> = await response.json();

    // Se não há produtos no BD, usa fallback
    if (!products || products.length === 0) {
      console.warn("Nenhum produto encontrado no BD, usando fallback");
      return [{ id: "123" }];
    }

    // Retorna os IDs dos produtos encontrados
    return products.map((product) => ({ id: product.id }));
  } catch (error) {
    console.warn("Erro ao conectar com a API durante o build:", error);
    // Fallback em caso de erro
    return [{ id: "123" }];
  }
}

export default function ProductDetails(_props: Props) {
  return <DetailsProducts />;
}
