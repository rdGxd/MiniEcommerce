import { DetailsProducts } from "@/components/details-products";


interface ProductDetailsProps {
  readonly params: {
    readonly id: string;
  };
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = params;
  return <DetailsProducts productId={id} />;
}
