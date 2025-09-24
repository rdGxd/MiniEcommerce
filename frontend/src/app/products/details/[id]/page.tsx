"use client";

interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function ProductDetails({ params }: Props) {
  const { id } = params;

  return (
    <>
      <p>Page content for product {id}</p>
    </>
  );
}
