import { api } from "@/helper/axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Types baseados no backend
export interface CreateOrderItemDto {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface UpdateOrderItemDto {
  quantity?: number;
  price?: number;
}

export interface OrderItemResponse {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Helper para headers de autenticação
const getAuthHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

export const useOrderItems = (orderId?: string) => {
  const [orderItems, setOrderItems] = useState<OrderItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Função para buscar order-items
  const fetchOrderItems = useCallback(async () => {
    if (!Cookies.get("accessToken")) return;

    setIsLoading(true);
    setError(null);

    try {
      const url = orderId ? `/order-item?orderId=${orderId}` : "/order-item";
      const response = await api.get(url, getAuthHeaders());
      setOrderItems(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar order-items:", err);
      setError("Erro ao carregar itens do pedido");
      toast.error("Erro ao carregar itens do pedido");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  // Buscar dados quando o hook é montado ou orderId muda
  useEffect(() => {
    fetchOrderItems();
  }, [fetchOrderItems]);

  // Função para criar order-item
  const createOrderItem = useCallback(async (data: CreateOrderItemDto) => {
    setIsCreating(true);
    try {
      const response = await api.post("/order-item", data, getAuthHeaders());
      const newItem: OrderItemResponse = response.data;

      // Atualizar estado local
      setOrderItems(prev => [...prev, newItem]);
      toast.success("Item adicionado ao pedido com sucesso!");

      return newItem;
    } catch (error: any) {
      console.error("Erro ao criar order-item:", error);
      toast.error("Erro ao adicionar item ao pedido.");
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, []);

  // Função para atualizar order-item
  const updateOrderItem = useCallback(async (id: string, data: UpdateOrderItemDto) => {
    setIsUpdating(true);
    try {
      const response = await api.patch(`/order-item/${id}`, data, getAuthHeaders());
      const updatedItem: OrderItemResponse = response.data;

      // Atualizar estado local
      setOrderItems(prev =>
        prev.map(item => item.id === id ? updatedItem : item)
      );
      toast.success("Item atualizado com sucesso!");

      return updatedItem;
    } catch (error: any) {
      console.error("Erro ao atualizar order-item:", error);
      toast.error("Erro ao atualizar item do pedido.");
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  // Função para remover order-item
  const deleteOrderItem = useCallback(async (id: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/order-item/${id}`, getAuthHeaders());

      // Atualizar estado local
      setOrderItems(prev => prev.filter(item => item.id !== id));
      toast.success("Item removido do pedido com sucesso!");
    } catch (error: any) {
      console.error("Erro ao remover order-item:", error);
      toast.error("Erro ao remover item do pedido.");
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  // Função para buscar um order-item específico
  const getOrderItem = useCallback(async (id: string): Promise<OrderItemResponse> => {
    const response = await api.get(`/order-item/${id}`, getAuthHeaders());
    return response.data;
  }, []);

  // Função para criar múltiplos order-items (útil para checkout)
  const createMultipleOrderItems = useCallback(async (items: CreateOrderItemDto[]) => {
    setIsCreating(true);
    try {
      const promises = items.map(item =>
        api.post("/order-item", item, getAuthHeaders())
      );
      const responses = await Promise.all(promises);
      const newItems = responses.map(response => response.data);

      // Atualizar estado local
      setOrderItems(prev => [...prev, ...newItems]);
      toast.success(`${newItems.length} itens adicionados ao pedido!`);

      return newItems;
    } catch (error: any) {
      console.error("Erro ao criar múltiplos order-items:", error);
      toast.error("Erro ao adicionar itens ao pedido.");
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, []);

  // Função para calcular total de um order-item
  const calculateItemTotal = useCallback((item: OrderItemResponse): number => {
    return item.quantity * item.price;
  }, []);

  // Função para calcular total de todos os order-items
  const calculateOrderTotal = useCallback((items: OrderItemResponse[]): number => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  }, [calculateItemTotal]);

  // Função para recarregar dados
  const refetch = useCallback(() => {
    fetchOrderItems();
  }, [fetchOrderItems]);

  return {
    // Dados
    orderItems,
    isLoading,
    error,

    // Actions
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    getOrderItem,
    createMultipleOrderItems,
    refetch,

    // Utilities
    calculateItemTotal,
    calculateOrderTotal,

    // Loading states
    isCreating,
    isUpdating,
    isDeleting,
  };
};

// Hook específico para buscar order-items de um pedido
export const useOrderItemsByOrder = (orderId: string) => {
  return useOrderItems(orderId);
};

// Hook para admin (busca todos os order-items)
export const useAllOrderItems = () => {
  return useOrderItems();
};
