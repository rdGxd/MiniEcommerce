import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { OrderStatus } from '../../common/enums/order-enum';
import { PaymentMethod, PaymentStatus } from '../../common/enums/payment-enums';
import { UserRoles } from '../../common/enums/role.enum';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Order } from '../../order/entities/order.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

export class MockDataSeed {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async run() {
    console.log('🌱 Iniciando seed dos dados mock...');

    // Limpar dados existentes (em ordem para evitar conflitos de foreign key)
    await this.cleanDatabase();

    // Criar dados mock
    const categories = await this.createCategories();
    const users = await this.createUsers();
    const products = await this.createProducts(categories);
    const orders = await this.createOrders(users);
    const orderItems = await this.createOrderItems(orders, products);
    const payments = await this.createPayments(users);

    console.log('✅ Seed concluído com sucesso!');
    console.log(`📊 Dados criados:
      - ${categories.length} categorias
      - ${users.length} usuários
      - ${products.length} produtos
      - ${orders.length} pedidos
      - ${orderItems.length} itens de pedido
      - ${payments.length} pagamentos`);
  }

  private async cleanDatabase() {
    console.log('🧹 Limpando dados existentes...');

    // Usar SQL direto para limpar as tabelas na ordem correta
    await this.dataSource.query('DELETE FROM order_item');
    await this.dataSource.query('DELETE FROM "order"');
    await this.dataSource.query('DELETE FROM payment');
    await this.dataSource.query('DELETE FROM product_categories_category');
    await this.dataSource.query('DELETE FROM product');
    await this.dataSource.query('DELETE FROM category');
    await this.dataSource.query('DELETE FROM "user"');
  }

  private async createCategories(): Promise<Category[]> {
    console.log('📂 Criando categorias...');

    const categoryRepo = this.dataSource.getRepository(Category);
    const categoryNames = [
      'Eletrônicos',
      'Roupas e Acessórios',
      'Casa e Jardim',
      'Esportes e Lazer',
      'Livros e Mídia',
      'Beleza e Cuidados Pessoais',
      'Brinquedos e Jogos',
      'Automotivo',
      'Alimentação e Bebidas',
      'Saúde e Bem-estar'
    ];

    const categories = categoryNames.map(name => {
      const category = new Category();
      category.name = name;
      return category;
    });

    return await categoryRepo.save(categories);
  }

  private async createUsers(): Promise<User[]> {
    console.log('👤 Criando usuários...');

    const userRepo = this.dataSource.getRepository(User);
    const users: User[] = [];

    // Criar admin
    const admin = new User();
    admin.name = 'Admin Sistema';
    admin.email = 'admin@minicommerce.com';
    admin.password = await bcrypt.hash('admin123', 10);
    admin.role = UserRoles.ADMIN;
    users.push(admin);

    // Criar usuários comuns
    for (let i = 0; i < 20; i++) {
      const user = new User();
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.password = await bcrypt.hash('user123', 10);
      user.role = UserRoles.USER;
      users.push(user);
    }

    return await userRepo.save(users);
  }

  private async createProducts(categories: Category[]): Promise<Product[]> {
    console.log('📦 Criando produtos...');

    const productRepo = this.dataSource.getRepository(Product);
    const products: Product[] = [];

    const productTemplates = [
      { name: 'Smartphone Samsung Galaxy', description: 'Smartphone Android com tela AMOLED', priceRange: [800, 1500] },
      { name: 'Notebook Dell Inspiron', description: 'Notebook para uso doméstico e profissional', priceRange: [2000, 4000] },
      { name: 'Camiseta Polo', description: 'Camiseta polo de algodão premium', priceRange: [50, 120] },
      { name: 'Tênis Nike Air', description: 'Tênis esportivo para corrida', priceRange: [200, 500] },
      { name: 'Livro "Clean Code"', description: 'Livro sobre programação limpa', priceRange: [40, 80] },
      { name: 'Perfume Importado', description: 'Perfume masculino/feminino importado', priceRange: [150, 400] },
      { name: 'Console PlayStation', description: 'Console de videogame Sony', priceRange: [2000, 3000] },
      { name: 'Pneu Michelin', description: 'Pneu para carros de passeio', priceRange: [300, 600] },
      { name: 'Cafeteira Nespresso', description: 'Cafeteira automática para cápsulas', priceRange: [200, 800] },
      { name: 'Proteína Whey', description: 'Suplemento proteico para exercícios', priceRange: [80, 200] }
    ];

    for (let i = 0; i < 50; i++) {
      const template = productTemplates[i % productTemplates.length];
      const product = new Product();

      product.name = `${template.name} ${faker.commerce.productMaterial()} ${faker.number.int({ min: 100, max: 999 })}`;
      product.description = `${template.description}. ${faker.commerce.productDescription()}`;
      product.price = faker.number.int({ min: template.priceRange[0], max: template.priceRange[1] });
      product.stock = faker.number.int({ min: 5, max: 100 });
      product.imageUrl = faker.image.url({ width: 400, height: 300 });

      // Associar a 1-3 categorias aleatórias
      const numCategories = faker.number.int({ min: 1, max: 3 });
      product.categories = faker.helpers.arrayElements(categories, numCategories);

      products.push(product);
    }

    return await productRepo.save(products);
  }

  private async createOrders(users: User[]): Promise<Order[]> {
    console.log('🛍️ Criando pedidos...');

    const orderRepo = this.dataSource.getRepository(Order);
    const orders: Order[] = [];

    // Pegar apenas usuários comuns (não admin) para criar pedidos
    const regularUsers = users.filter(user => user.role === UserRoles.USER);

    for (let i = 0; i < 30; i++) {
      const order = new Order();
      order.user = faker.helpers.arrayElement(regularUsers);
      order.status = faker.helpers.enumValue(OrderStatus);
      order.total = 0; // Será calculado automaticamente
      orders.push(order);
    }

    return await orderRepo.save(orders);
  }

  private async createOrderItems(orders: Order[], products: Product[]): Promise<OrderItem[]> {
    console.log('📋 Criando itens de pedido...');

    const orderItemRepo = this.dataSource.getRepository(OrderItem);
    const orderItems: OrderItem[] = [];

    for (const order of orders) {
      // Cada pedido terá 1-5 itens
      const numItems = faker.number.int({ min: 1, max: 5 });
      const orderProducts = faker.helpers.arrayElements(products, numItems);

      for (const product of orderProducts) {
        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product = product;
        orderItem.quantity = faker.number.int({ min: 1, max: 5 });
        orderItem.price = product.price;
        orderItems.push(orderItem);
      }
    }

    const savedOrderItems = await orderItemRepo.save(orderItems);

    // Atualizar totais dos pedidos
    const orderRepo = this.dataSource.getRepository(Order);
    for (const order of orders) {
      const items = savedOrderItems.filter(item => item.order.id === order.id);
      order.orderItems = items;
      order.calculateTotal();
    }
    await orderRepo.save(orders);

    return savedOrderItems;
  }

  private async createPayments(users: User[]): Promise<Payment[]> {
    console.log('💳 Criando pagamentos...');

    const paymentRepo = this.dataSource.getRepository(Payment);
    const payments: Payment[] = [];

    // Pegar apenas usuários comuns (não admin) para criar pagamentos
    const regularUsers = users.filter(user => user.role === UserRoles.USER);

    for (let i = 0; i < 40; i++) {
      const payment = new Payment();
      payment.user = faker.helpers.arrayElement(regularUsers);
      payment.amount = faker.number.float({ min: 10, max: 1000, fractionDigits: 2 });
      payment.currency = 'BRL';
      payment.method = faker.helpers.enumValue(PaymentMethod);
      payment.status = faker.helpers.enumValue(PaymentStatus);
      payments.push(payment);
    }

    return await paymentRepo.save(payments);
  }
}
