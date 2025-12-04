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
    link: '/marche-agricole/legumes'
  },
  {
    id: '2',
    name: 'Fruits',
    image: '/images/category-fruits.png',
    link: '/marche-agricole/fruits'
  },
  {
    id: '3',
    name: 'Céréales',
    image: '/images/category-cereales.svg',
    link: '/marche-agricole/cereales'
  }
];

export const products: Product[] = [
  // Légumes
  {
    id: '1',
    name: 'Tomates Précoces',
    image: '/images/vegetables/tomatoes.png',
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
    image: '/images/vegetables/onions.png',
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
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
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
    id: '10',
    name: 'Poivrons',
    image: '/images/vegetables/peppers.png',
    producer: 'Amadou Diallo',
    location: 'Thiès',
    stockStatus: 'disponible',
    shippingDays: 3,
    minQuantity: 50,
    unit: 'kg',
    price: 350,
    category: 'Légumes'
  },
  {
    id: '11',
    name: 'Aubergines',
    image: '/images/vegetables/eggplant.png',
    producer: 'Awa Ndiaye',
    location: 'Kaolack',
    stockStatus: 'limité',
    shippingDays: 4,
    minQuantity: 30,
    unit: 'kg',
    price: 280,
    category: 'Légumes'
  },
  {
    id: '12',
    name: 'Pommes de terre',
    image: '/images/vegetables/potatoes.png',
    producer: 'Moussa Ba',
    location: 'Saint-Louis',
    stockStatus: 'disponible',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 250,
    category: 'Légumes'
  },
  // Fruits
  {
    id: '4',
    name: 'Oranges',
    image: '/images/fruits/oranges.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'disponible',
    shippingDays: 5,
    minQuantity: 20,
    unit: 'kg',
    price: 300,
    category: 'Fruits'
  },
  {
    id: '5',
    name: 'Raisins',
    image: '/images/fruits/grapes.png',
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
    image: '/images/fruits/mangoes.png',
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
    id: '13',
    name: 'Bananes',
    image: '/images/fruits/bananas.png',
    producer: 'Ibrahima Sarr',
    location: 'Ziguinchor',
    stockStatus: 'disponible',
    shippingDays: 3,
    minQuantity: 50,
    unit: 'kg',
    price: 400,
    category: 'Fruits'
  },
  {
    id: '14',
    name: 'Pastèque',
    image: '/images/fruits/watermelon.png',
    producer: 'Cheikh Diop',
    location: 'Louga',
    stockStatus: 'limité',
    shippingDays: 4,
    minQuantity: 20,
    unit: 'kg',
    price: 200,
    category: 'Fruits'
  },
  {
    id: '15',
    name: 'Ananas',
    image: '/images/fruits/pineapple.png',
    producer: 'Fatou Sall',
    location: 'Kolda',
    stockStatus: 'disponible',
    shippingDays: 6,
    minQuantity: 30,
    unit: 'kg',
    price: 450,
    category: 'Fruits'
  },
  // Céréales
  {
    id: '7',
    name: 'Blé',
    image: '/images/cereals/wheat.png',
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
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
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
    image: '/images/cereals/yellow-corn.png',
    producer: 'Modou Fall',
    location: 'Fatick',
    stockStatus: 'limité',
    shippingDays: 5,
    minQuantity: 100,
    unit: 'kg',
    price: 300,
    category: 'Céréales'
  },
  {
    id: '16',
    name: 'Mil',
    image: '/images/cereals/millet.png',
    producer: 'Ousmane Dieng',
    location: 'Matam',
    stockStatus: 'disponible',
    shippingDays: 4,
    minQuantity: 80,
    unit: 'kg',
    price: 320,
    category: 'Céréales'
  },
  {
    id: '17',
    name: 'Sorgho',
    image: '/images/cereals/sorghum.png',
    producer: 'Mariama Sy',
    location: 'Tambacounda',
    stockStatus: 'limité',
    shippingDays: 7,
    minQuantity: 50,
    unit: 'kg',
    price: 280,
    category: 'Céréales'
  },
  {
    id: '18',
    name: 'Fonio',
    image: '/images/cereals/fonio.png',
    producer: 'Abdou Diouf',
    location: 'Kédougou',
    stockStatus: 'disponible',
    shippingDays: 6,
    minQuantity: 40,
    unit: 'kg',
    price: 500,
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