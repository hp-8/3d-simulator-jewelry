import { Product } from '../types';

export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  switch (sortBy) {
    case 'price-low-to-high':
      return products.slice().sort((a, b) => a.price - b.price);
    case 'price-high-to-low':
      return products.slice().sort((a, b) => b.price - a.price);
    case 'name-alphabetical':
      return products.slice().sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
};
