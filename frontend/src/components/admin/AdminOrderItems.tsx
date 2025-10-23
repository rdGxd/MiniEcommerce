import { useAllOrderItems } from "@/components/hooks/useOrderItems";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AdminOrderItems() {
  const {
    orderItems,
    isLoading,
    error,
    updateOrderItem,
    deleteOrderItem,
    calculateOrderTotal,
    isUpdating,
    isDeleting,
    refetch,
  } = useAllOrderItems();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-gray-500">Carregando order-items...</div>
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

  // Filtrar por pedido selecionado
  const filteredItems = selectedOrderId
    ? orderItems.filter(item => item.orderId === selectedOrderId)
    : orderItems;

  // Obter lista única de order IDs
  const uniqueOrderIds = [...new Set(orderItems.map(item => item.orderId))];

  const handleUpdateQuantity = async (itemId: string, currentQuantity: number, increment: number) => {
    const newQuantity = currentQuantity + increment;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gerenciar Order Items</h2>
        <Button onClick={refetch} variant="outline">
          Atualizar
        </Button>
      </div>

      {/* Filtro por pedido */}
      <div className="flex items-center space-x-3">
        <label htmlFor="order-filter" className="font-medium">
          Filtrar por pedido:
        </label>
        <select
          id="order-filter"
          value={selectedOrderId || ""}
          onChange={(e) => setSelectedOrderId(e.target.value || null)}
          className="rounded border p-2"
        >
          <option value="">Todos os pedidos</option>
          {uniqueOrderIds.map(orderId => (
            <option key={orderId} value={orderId}>
              {orderId}
            </option>
          ))}
        </select>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{filteredItems.length}</div>
          <div className="text-gray-500">Total de Itens</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{uniqueOrderIds.length}</div>
          <div className="text-gray-500">Pedidos únicos</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">
            R$ {calculateOrderTotal(filteredItems).toFixed(2)}
          </div>
          <div className="text-gray-500">Valor Total</div>
        </div>
      </div>

      {/* Lista de order-items */}
      {filteredItems.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          Nenhum order-item encontrado.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
            >
              <div className="flex-1 space-y-1">
                <div className="font-medium">
                  Order: {item.orderId}
                </div>
                <div className="text-sm text-gray-500">
                  Produto: {item.productId}
                </div>
                <div className="text-sm text-gray-500">
                  Item ID: {item.id}
                </div>
                <div className="text-sm text-gray-500">
                  Criado em: {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Preço unitário */}
                <div className="text-center">
                  <div className="text-sm text-gray-500">Preço</div>
                  <div className="font-medium">R$ {item.price.toFixed(2)}</div>
                </div>

                {/* Controle de quantidade */}
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                    disabled={item.quantity <= 1 || isUpdating}
                  >
                    -
                  </Button>
                  <span className="mx-2 min-w-[2rem] text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                    disabled={isUpdating}
                  >
                    +
                  </Button>
                </div>

                {/* Total do item */}
                <div className="text-center">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-bold">
                    R$ {(item.quantity * item.price).toFixed(2)}
                  </div>
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
      )}
    </div>
  );
}
