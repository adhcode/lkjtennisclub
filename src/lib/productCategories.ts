// Product categories and their configurations
export const PRODUCT_CATEGORIES = {
  rackets: {
    id: 'rackets',
    name: 'Rackets',
    description: 'Tennis rackets for all skill levels',
    fields: ['brand', 'weight', 'headSize', 'balance', 'stringPattern'],
  },
  balls: {
    id: 'balls',
    name: 'Tennis Balls',
    description: 'Professional and recreational tennis balls',
    fields: ['brand', 'quantity', 'type'],
  },
  'mens-apparel': {
    id: 'mens-apparel',
    name: "Men's Apparel",
    description: "Men's tennis clothing and sportswear",
    fields: ['brand', 'sizes', 'colors', 'material'],
  },
  'womens-apparel': {
    id: 'womens-apparel',
    name: "Women's Apparel",
    description: "Women's tennis clothing and sportswear",
    fields: ['brand', 'sizes', 'colors', 'material'],
  },
  shoes: {
    id: 'shoes',
    name: 'Shoes',
    description: 'Tennis shoes and footwear',
    fields: ['brand', 'sizes', 'colors', 'surface'],
  },
  accessories: {
    id: 'accessories',
    name: 'Accessories',
    description: 'Tennis bags, grips, and other accessories',
    fields: ['brand', 'type'],
  },
  strings: {
    id: 'strings',
    name: 'Strings',
    description: 'Tennis racket strings',
    fields: ['brand', 'gauge', 'material', 'type'],
  },
} as const;

export type CategoryId = keyof typeof PRODUCT_CATEGORIES;

export const getCategoryOptions = () => {
  return Object.values(PRODUCT_CATEGORIES).map(cat => ({
    value: cat.id,
    label: cat.name,
  }));
};

export const COMMON_SIZES = {
  'mens-apparel': ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  'womens-apparel': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  shoes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
};

export const COMMON_COLORS = [
  'White',
  'Black',
  'Navy',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Pink',
  'Purple',
  'Gray',
];
