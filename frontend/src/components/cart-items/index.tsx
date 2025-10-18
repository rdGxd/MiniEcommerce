'use client'

import { useCart } from "@/contexts/CartContext";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function CartItems() {
  const { items, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 rounded-2xl border border-gray-200 p-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b p-2 pb-4 last:border-0"
        >
          <Image
            src={item.imageUrl || "https://picsum.photos/200/300?random=1"}
            alt={item.name}
            width={200}
            height={300}
            className="h-36 w-24 object-cover"
          />
          <div className="flex h-full flex-1 flex-col justify-between border-l border-dashed border-gray-200 pl-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-xl font-bold text-black">
              {"$" + item.price.toFixed(2)}
            </p>

            <div className="">
              <Button
                onClick={() => removeItem(item.id)}
                className="mt-2 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-red-100"
              >
                <Trash2Icon className="h-4 w-4 text-red-500" />
              </Button>
              <div className="mt-2 flex w-max items-center justify-center rounded-full bg-gray-300 p-1 text-center">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="cursor-pointer border-none bg-transparent text-2xl text-black hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </Button>

                <p className="">{item.quantity}</p>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
