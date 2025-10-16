import { DetailsProducts } from "@/components/details-products";


interface ProductDetailsProps {
  readonly params: {
    readonly id: string;
  };
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = params;
  console.log("Rendering ProductDetails component123213131", id);
  return <DetailsProducts />;
}
