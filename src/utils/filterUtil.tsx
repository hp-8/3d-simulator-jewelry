  import { Product } from '../types';

export const filterProducts = (
  products: Product[],
  categoryFilter: string,
  priceRangeFilter: string
): Product[] => {
  return products.filter((product) => {
    const categoryMatch = categoryFilter === '' || product.category === categoryFilter;
    const priceMatch =
      priceRangeFilter === '' || isPriceInRange(product.price, priceRangeFilter);
    return categoryMatch && priceMatch;
  });
};

const isPriceInRange = (price: number, priceRangeFilter: string): boolean => {
  const [minPrice, maxPrice] = getPriceRangeBounds(priceRangeFilter);
  return price >= minPrice && price <= maxPrice;
};

const getPriceRangeBounds = (priceRangeFilter: string): [number, number] => {
  switch (priceRangeFilter) {
    case '0-199':
      return [0, 199];
    case '200-599':
      return [200, 599];
    case '600-999':
      return [600, 999];
    case '1000-1899':
      return [1000, 1899];
    default:
      return [0, Infinity];
  }
};
