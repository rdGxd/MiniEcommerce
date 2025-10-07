'use client'

import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

const MOCK_CART_ITEMS = [
  {
    id: "1",
    imageURL: "https://picsum.photos/200/300?random=1",
    name: "Product 1",
    price: 29.99,
    quantity: 2,
  },
  {
    id: "2",
    imageURL: "https://picsum.photos/200/300?random=2",
    name: "Product 2",
    price: 49.99,
    quantity: 1,
  },
  {
    id: "3",
    imageURL: "https://picsum.photos/200/300?random=3",
    name: "Product 3",
    price: 19.99,
    quantity: 3,
  },
];

export function CartItems() {
  const handleRemoveItem = (id: string) => {
    console.log(`Remove item with id: ${id}`);
  }

  const handleAmountChange = (id: string, newQuantity: number) => {
    console.log(`Change quantity for item with id: ${id} to ${newQuantity}`);
  }

  return (
    <div className="grid gap-6 rounded-2xl border border-gray-200 p-2">
      {MOCK_CART_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b p-2 pb-4 last:border-0"
        >
          <img
            src={item.imageURL}
            alt={item.name}
            className="h-36 w-24 object-cover"
          />
          <div className="flex h-full flex-1 flex-col justify-between border-l border-dashed border-gray-200 pl-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-xl font-bold text-black">
              ${item.price.toFixed(2)}
            </p>

            <div className="">
              <Button
                onClick={() => handleRemoveItem(item.id)}
                className="mt-2 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-red-100"
              >
                <Trash2Icon className="h-4 w-4 text-red-500" />
              </Button>
              <div className="mt-2 flex w-max items-center justify-center rounded-full bg-gray-300 p-1 text-center">
                <Button
                  onClick={() => handleAmountChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="cursor-pointer border-none bg-transparent text-2xl text-black hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </Button>

                <p className="">{item.quantity}</p>
                <Button
                  onClick={() => handleAmountChange(item.id, item.quantity + 1)}
                  className="cursor-pointer border-none bg-transparent text-2xl text-black hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
