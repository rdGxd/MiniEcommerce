import { useOrderItems } from "@/components/hooks/useOrderItems";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export function CheckoutFlow() {
  const { items: cartItems, total, clearCart } = useCart();
  const { createMultipleOrderItems, isCreating } = useOrderItems();
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  // Simular criação de um pedido (você precisará implementar a API de order)
  const createOrder = async (): Promise<string> => {
    // Aqui você faria a chamada para criar um Order
    // const response = await api.post('/order', { userId });
    // return response.data.id;

    // Para exemplo, vou retornar um ID simulado
    return `order-${Date.now()}`;
  };

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("Carrinho está vazio!");
        return;
      }

      // 1. Criar o pedido principal
      const orderId = await createOrder();
      setCurrentOrderId(orderId);

      // 2. Converter itens do carrinho em CreateOrderItemDto
      const orderItemsData = cartItems.map((cartItem) => ({
        orderId: orderId,
        productId: cartItem.id, // Assumindo que cartItem tem um id do produto
        quantity: cartItem.quantity,
        price: cartItem.price,
      }));

      // 3. Criar todos os order-items
      await createMultipleOrderItems(orderItemsData);

      // 4. Limpar o carrinho após sucesso
      clearCart();

      toast.success(`Pedido ${orderId} criado com sucesso!`);

      // Redirecionar para página de confirmação ou detalhes do pedido
      // router.push(`/orders/${orderId}`);

    } catch (error) {
      console.error("Erro no checkout:", error);
      toast.error("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Finalizar Pedido</h2>

      {/* Resumo do carrinho */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-3 text-lg font-semibold">Resumo do Pedido</h3>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Carrinho está vazio</p>
        ) : (
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-2 font-bold">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botão de checkout */}
      <Button
        onClick={handleCheckout}
        disabled={cartItems.length === 0 || isCreating}
        className="w-full"
        size="lg"
      >
        {isCreating ? "Processando..." : "Finalizar Pedido"}
      </Button>

      {/* Status do pedido atual */}
      {currentOrderId && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-green-700">
            ✅ Pedido {currentOrderId} criado com sucesso!
          </p>
        </div>
      )}
    </div>
  );
}
