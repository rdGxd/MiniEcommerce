export class ResponseProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categories: { id: string; name: string }[];
  createdAt: Date;
  updatedAt: Date;
}
