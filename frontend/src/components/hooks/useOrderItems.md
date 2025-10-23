# useOrderItems Hook - Documentação

Este hook foi criado para gerenciar as operações de Order Items no frontend, facilitando a interação com a API do backend.

## Importação

```typescript
import {
  useOrderItems,
  useOrderItemsByOrder,
  useAllOrderItems
} from "@/components/hooks/useOrderItems";
```

## Tipos TypeScript

```typescript
interface CreateOrderItemDto {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

interface UpdateOrderItemDto {
  quantity?: number;
  price?: number;
}

interface OrderItemResponse {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Hooks Disponíveis

### 1. `useOrderItems(orderId?: string)`

Hook principal que pode buscar todos os order-items ou filtrar por orderId.

```typescript
const {
  orderItems,           // Array de order-items
  isLoading,           // Estado de carregamento
  error,               // Mensagem de erro (se houver)
  createOrderItem,     // Função para criar order-item
  updateOrderItem,     // Função para atualizar order-item
  deleteOrderItem,     // Função para remover order-item
  getOrderItem,        // Função para buscar order-item específico
  createMultipleOrderItems, // Função para criar múltiplos order-items
  refetch,             // Função para recarregar dados
  calculateItemTotal,  // Função para calcular total de um item
  calculateOrderTotal, // Função para calcular total de todos os itens
  isCreating,          // Estado de criação
  isUpdating,          // Estado de atualização
  isDeleting,          // Estado de remoção
} = useOrderItems(orderId);
```

### 2. `useOrderItemsByOrder(orderId: string)`

Hook específico para buscar order-items de um pedido específico.

```typescript
const orderItemsHook = useOrderItemsByOrder("order-123");
```

### 3. `useAllOrderItems()`

Hook para admins buscarem todos os order-items (requer permissão ADMIN).

```typescript
const allOrderItemsHook = useAllOrderItems();
```

## Exemplos de Uso

### 1. Visualizar Order Items de um Pedido

```typescript
import { useOrderItemsByOrder } from "@/components/hooks/useOrderItems";

function OrderDetails({ orderId }: { orderId: string }) {
  const { orderItems, isLoading, calculateOrderTotal } = useOrderItemsByOrder(orderId);

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Itens do Pedido</h2>
      {orderItems.map(item => (
        <div key={item.id}>
          <p>Produto: {item.productId}</p>
          <p>Quantidade: {item.quantity}</p>
          <p>Preço: R$ {item.price.toFixed(2)}</p>
        </div>
      ))}
      <p>Total: R$ {calculateOrderTotal(orderItems).toFixed(2)}</p>
    </div>
  );
}
```

### 2. Checkout - Converter Carrinho em Order Items

```typescript
import { useOrderItems } from "@/components/hooks/useOrderItems";
import { useCart } from "@/contexts/CartContext";

function Checkout() {
  const { items: cartItems, clearCart } = useCart();
  const { createMultipleOrderItems, isCreating } = useOrderItems();

  const handleCheckout = async () => {
    try {
      // 1. Criar pedido
      const orderId = await createOrder(); // Sua função para criar order

      // 2. Converter carrinho em order-items
      const orderItemsData = cartItems.map(item => ({
        orderId,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // 3. Criar order-items
      await createMultipleOrderItems(orderItemsData);

      // 4. Limpar carrinho
      clearCart();

      // 5. Redirecionar ou mostrar sucesso
      toast.success("Pedido criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar pedido");
    }
  };

  return (
    <button onClick={handleCheckout} disabled={isCreating}>
      {isCreating ? "Processando..." : "Finalizar Pedido"}
    </button>
  );
}
```

### 3. Admin - Gerenciar Order Items

```typescript
import { useAllOrderItems } from "@/components/hooks/useOrderItems";

function AdminOrderItems() {
  const {
    orderItems,
    updateOrderItem,
    deleteOrderItem,
    isUpdating,
    isDeleting
  } = useAllOrderItems();

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    await updateOrderItem(itemId, { quantity: newQuantity });
  };

  const handleRemoveItem = async (itemId: string) => {
    if (confirm("Remover item?")) {
      await deleteOrderItem(itemId);
    }
  };

  return (
    <div>
      {orderItems.map(item => (
        <div key={item.id}>
          <span>Qtd: {item.quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            disabled={isUpdating}
          >
            +
          </button>
          <button
            onClick={() => handleRemoveItem(item.id)}
            disabled={isDeleting}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 4. Criar Order Item Individual

```typescript
import { useOrderItems } from "@/components/hooks/useOrderItems";

function AddItemToOrder({ orderId, productId }: Props) {
  const { createOrderItem, isCreating } = useOrderItems();

  const handleAddItem = async () => {
    await createOrderItem({
      orderId,
      productId,
      quantity: 1,
      price: 99.99,
    });
  };

  return (
    <button onClick={handleAddItem} disabled={isCreating}>
      {isCreating ? "Adicionando..." : "Adicionar ao Pedido"}
    </button>
  );
}
```

## Componentes Prontos

O hook vem com componentes de exemplo já implementados:

- `OrderDetails` - Para visualizar itens de um pedido
- `CheckoutFlow` - Para fluxo de checkout
- `AdminOrderItems` - Para administração de order-items

## Funcionalidades

✅ **CRUD Completo** - Criar, ler, atualizar e remover order-items
✅ **Autenticação** - Headers automáticos com token JWT
✅ **Estados de Loading** - Controle de estados de carregamento
✅ **Tratamento de Erros** - Exibição de erros com toast
✅ **Cálculos** - Funções para calcular totais
✅ **TypeScript** - Tipagem completa
✅ **Reatividade** - Atualização automática do estado local

## Permissões

- **Usuário comum**: Pode ver seus próprios order-items (quando filtrado por orderId)
- **Admin**: Pode ver todos os order-items usando `useAllOrderItems()`

## Dependências

- React Hooks (useState, useCallback, useEffect)
- Axios para requisições HTTP
- js-cookie para gerenciamento de tokens
- react-toastify para notificações
