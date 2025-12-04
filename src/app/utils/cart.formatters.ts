// Format currency in CFA Francs
export const formatCurrency = (amount: number): string => {
  return `₣${amount.toLocaleString('fr-FR')}`;
};

// Format price per unit
export const formatUnitPrice = (price: number, unit: string): string => {
  return `₣${price}/${unit}`;
};

// Format cart item count
export const formatCartCount = (count: number): string => {
  return `(${count} article${count > 1 ? 's' : ''})`;
};