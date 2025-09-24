"use client";

import { DetailsProducts } from "@/components/details-products";

interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function ProductDetails({ params }: Props) {
  return <DetailsProducts />;
}
