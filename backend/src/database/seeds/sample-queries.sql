-- Consultas de exemplo para verificar os dados mock criados

-- Verificar usuários criados
SELECT id, name, email, role, "createdAt"
FROM "user"
ORDER BY role DESC, name;

-- Verificar categorias
SELECT id, name, "createdAt"
FROM category
ORDER BY name;

-- Verificar produtos com suas categorias
SELECT p.id, p.name, p.price, p.stock,
       string_agg(c.name, ', ') as categories
FROM product p
LEFT JOIN product_categories_category pcc ON p.id = pcc."productId"
LEFT JOIN category c ON c.id = pcc."categoryId"
GROUP BY p.id, p.name, p.price, p.stock
ORDER BY p.name
LIMIT 10;

-- Verificar pedidos com totais
SELECT o.id, u.name as user_name, o.status, o.total, o."createdAt",
       COUNT(oi.id) as items_count
FROM "order" o
JOIN "user" u ON o."userId" = u.id
LEFT JOIN order_item oi ON oi."orderId" = o.id
GROUP BY o.id, u.name, o.status, o.total, o."createdAt"
ORDER BY o."createdAt" DESC
LIMIT 10;

-- Verificar itens de pedido
SELECT oi.id, p.name as product_name, oi.quantity, oi.price,
       (oi.quantity * oi.price) as total_item
FROM order_item oi
JOIN product p ON oi."productId" = p.id
ORDER BY oi."createdAt" DESC
LIMIT 10;

-- Verificar pagamentos
SELECT py.id, u.name as user_name, py.amount, py.currency,
       py.method, py.status, py."createdAt"
FROM payment py
JOIN "user" u ON py."userId" = u.id
ORDER BY py."createdAt" DESC
LIMIT 10;

-- Estatísticas gerais
SELECT
    (SELECT COUNT(*) FROM "user") as total_users,
    (SELECT COUNT(*) FROM category) as total_categories,
    (SELECT COUNT(*) FROM product) as total_products,
    (SELECT COUNT(*) FROM "order") as total_orders,
    (SELECT COUNT(*) FROM order_item) as total_order_items,
    (SELECT COUNT(*) FROM payment) as total_payments;

-- Top 5 produtos por quantidade em pedidos
SELECT p.name, SUM(oi.quantity) as total_ordered
FROM product p
JOIN order_item oi ON p.id = oi."productId"
GROUP BY p.id, p.name
ORDER BY total_ordered DESC
LIMIT 5;
