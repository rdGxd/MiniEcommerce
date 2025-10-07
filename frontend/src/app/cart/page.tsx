import { CartItems } from "@/components/cart-items";
import { OrderSummary } from "@/components/order-summary";

export default function CartPage() {
  return (
    <div className="container mx-auto p-4 grid gap-8 md:grid-cols-2">
      <CartItems />
      <OrderSummary />
    </div>
  );
}
