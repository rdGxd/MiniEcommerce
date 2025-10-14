'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/contexts/ProductsContext';

export function ContextTestPage() {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { items, addItem, itemCount, total } = useCart();
  const { products, isLoading } = useProducts();

  const handleAddTestItem = () => {
    addItem({
      id: '1',
      name: 'Produto Teste',
      price: 99.99,
      imageUrl: 'https://picsum.photos/200/300?random=1'
    });
  };

  const handleTestLogin = () => {
    login('test-token', 'test-refresh-token', {
      id: '1',
      email: 'test@example.com',
      name: 'Usuário Teste'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Teste dos Contextos</h1>

      {/* Auth Context */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">AuthContext</h2>
        <p>Logado: {isLoggedIn ? 'Sim' : 'Não'}</p>
        <p>Usuário: {user?.email || 'N/A'}</p>
        <div className="mt-4 space-x-2">
          {!isLoggedIn ? (
            <Button onClick={handleTestLogin}>Login Teste</Button>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </div>
      </div>

      {/* Cart Context */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">CartContext</h2>
        <p>Itens no carrinho: {itemCount}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <Button onClick={handleAddTestItem} className="mt-4">
          Adicionar Item Teste
        </Button>
        <div className="mt-4">
          {items.map(item => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.quantity}x ${item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Context */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">ProductsContext</h2>
        <p>Carregando: {isLoading ? 'Sim' : 'Não'}</p>
        <p>Total de produtos: {products.length}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="p-2 border rounded">
              <p className="font-semibold">{product.name}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
