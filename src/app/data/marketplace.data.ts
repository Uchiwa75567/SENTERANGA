export interface Product {
  id: string;
  name: string;
  image: string;
  producer: string;
  location: string;
  stockStatus: 'limité' | 'disponible';
  shippingDays: number;
  minQuantity: number;
  unit: string;
  price: number;
  category: string;
}

export interface CategoryCard {
  id: string;
  name: string;
  image: string;
  link: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Livré' | 'En transit' | 'Préparation';
  items: string;
  producer: string;
  total: number;
}

export const categoryCards: CategoryCard[] = [
  {
    id: '1',
    name: 'Légumes',
    image: '/images/category-legumes.svg',
    link: '#'
  },
  {
    id: '2',
    name: 'Fruits',
    image: '/images/category-fruits.png',
    link: '#'
  },
  {
    id: '3',
    name: 'Céréales',
    image: '/images/category-cereales.svg',
    link: '#'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Tomates Précoces',
    image: '/images/product-tomates.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 20,
    unit: 'kg',
    price: 300,
    category: 'Légumes'
  },
  {
    id: '2',
    name: 'Oignons',
    image: '/images/product-oignons.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Légumes'
  },
  {
    id: '3',
    name: 'Carottes',
    image: '/images/product-carottes.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Légumes'
  },
  {
    id: '4',
    name: 'Oranges',
    image: '/images/product-oranges.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 20,
    unit: 'kg',
    price: 300,
    category: 'Fruits'
  },
  {
    id: '5',
    name: 'Raisins',
    image: '/images/product-raisins.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'disponible',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Fruits'
  },
  {
    id: '6',
    name: 'Mangues',
    image: '/images/product-mangues.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Fruits'
  },
  {
    id: '7',
    name: 'Blé',
    image: '/images/product-ble.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 20,
    unit: 'kg',
    price: 300,
    category: 'Céréales'
  },
  {
    id: '8',
    name: 'Riz',
    image: '/images/product-riz.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'disponible',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Céréales'
  },
  {
    id: '9',
    name: 'Maïs',
    image: '/images/product-mais.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Céréales'
  }
];

export const recentOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-001',
    date: '20 Nov',
    status: 'Livré',
    items: 'Tomates (2kg), Oignons (1kg)',
    producer: 'Amadou Diallo',
    total: 800
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
    date: '18 Nov',
    status: 'En transit',
    items: 'Mil (5kg)',
    producer: 'Moussa Ba',
    total: 1000
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
    date: '15 Nov',
    status: 'Préparation',
    items: 'Arachides (3kg)',
    producer: 'Awa Ndiaye',
    total: 420
  }
];