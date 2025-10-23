import { useOrderItemsByOrder } from "@/components/hooks/useOrderItems";
import { Button } from "@/components/ui/button";

interface OrderDetailsProps {
  readonly orderId: string;
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const {
    orderItems,
    isLoading,
    error,
    updateOrderItem,
    deleteOrderItem,
    calculateItemTotal,
    calculateOrderTotal,
    isUpdating,
    isDeleting,
    refetch,
  } = useOrderItemsByOrder(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-gray-500">Carregando detalhes do pedido...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-700">{error}</p>
        <Button onClick={refetch} className="mt-2">
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (orderItems.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        Nenhum item encontrado neste pedido.
      </div>
    );
  }

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateOrderItem(itemId, { quantity: newQuantity });
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (globalThis.confirm("Tem certeza que deseja remover este item?")) {
      try {
        await deleteOrderItem(itemId);
      } catch (error) {
        console.error("Erro ao remover item:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Detalhes do Pedido #{orderId}</h2>

      {/* Lista de itens */}
      <div className="space-y-3">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex-1">
              <div className="font-medium">Produto ID: {item.productId}</div>
              <div className="text-sm text-gray-500">
                Item ID: {item.id}
              </div>
              <div className="text-sm text-gray-500">
                Preço unitário: R$ {item.price.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Controle de quantidade */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                >
                  -
                </Button>
                <span className="mx-2 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={isUpdating}
                >
                  +
                </Button>
              </div>

              {/* Total do item */}
              <div className="min-w-[5rem] text-right font-medium">
                R$ {calculateItemTotal(item).toFixed(2)}
              </div>

              {/* Botão remover */}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleRemoveItem(item.id)}
                disabled={isDeleting}
              >
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Total do pedido */}
      <div className="border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total do Pedido:</span>
          <span>R$ {calculateOrderTotal(orderItems).toFixed(2)}</span>
        </div>
      </div>

      {/* Botão para recarregar */}
      <div className="flex justify-center">
        <Button onClick={refetch} variant="outline">
          Atualizar Dados
        </Button>
      </div>
    </div>
  );
}
