import { DetailsProducts } from "@/components/details-products";


interface ProductDetailsProps {
  readonly params: Promise<{
    readonly id: string;
  }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;
  return <DetailsProducts productId={id} />;
}
