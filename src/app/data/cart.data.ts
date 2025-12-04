import { CartItem } from '../models/cart.schema';

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Tomates Fraîches Bio',
    producer: 'Amadou Diallo',
    unitPrice: 250,
    unit: 'kg',
    quantity: 13,
    imageUrl: '/images/products/tomatoes-fresh.jpg'
  },
  {
    id: '2',
    name: 'Oignons Violets Premium',
    producer: 'Fatou Seck',
    unitPrice: 300,
    unit: 'kg',
    quantity: 1,
    imageUrl: '/images/products/onions-purple.jpg'
  },
  {
    id: '3',
    name: 'Mil Traditionnel',
    producer: 'Moussa Ba',
    unitPrice: 200,
    unit: 'kg',
    quantity: 5,
    imageUrl: '/images/products/millet-traditional.jpg'
  }
];