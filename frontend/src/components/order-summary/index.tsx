import { useCart } from "@/contexts/CartContext";
import { Button } from "../ui/button";

export function OrderSummary() {
  const { subtotal, shipping, tax, total, itemCount } = useCart();

  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>

      {itemCount === 0 ? (
        <p className="py-4 text-center text-gray-500">
          Nenhum item no carrinho
        </p>
      ) : (
        <>
          <div className="mb-2 flex justify-between">
            <span>
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}

      <div className="mt-4">
        <label className="mb-2 block font-medium" htmlFor="promo-code">
          Promo Code
        </label>
        <input
          type="text"
          id="promo-code"
          className="w-full rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter promo code"
        />
        <Button className="mt-2 w-full rounded-lg bg-gray-200 py-2 text-black transition-colors hover:bg-gray-300">
          {" "}
          Apply
        </Button>
      </div>
      <Button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700">
        Checkout
      </Button>
    </div>
  );
}
