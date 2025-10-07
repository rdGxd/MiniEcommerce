import { Button } from "../ui/button";

export function OrderSummary() {
  return (
    <div className="border p-6 rounded-2xl border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>$59.97</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>$5.00</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Tax</span>
        <span>$6.50</span>
      </div>
      <div className="border-t pt-4 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>$71.47</span>
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-medium" htmlFor="promo-code">
          Promo Code
        </label>
        <input
          type="text"
          id="promo-code"
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter promo code"
        />
        <Button className="mt-2 w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition-colors"> Apply
        </Button>
      </div>
      <Button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Checkout
      </Button>
    </div>
  );
}
