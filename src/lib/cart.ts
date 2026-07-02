// Cart utilities and types
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  slug: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  createdAt?: number; // Timestamp when cart was created
}

const CART_KEY = 'lkj_tennis_cart';
const CART_EXPIRY_DAYS = 7; // Cart expires after 7 days

export const getCart = (): Cart => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return { items: [], total: 0 };
  
  try {
    const cart: Cart = JSON.parse(stored);
    
    // Check if cart has expired (7 days)
    if (cart.createdAt) {
      const now = Date.now();
      const expiryTime = cart.createdAt + (CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      
      if (now > expiryTime) {
        // Cart expired, clear it
        clearCart();
        return { items: [], total: 0 };
      }
    }
    
    return cart;
  } catch {
    return { items: [], total: 0 };
  }
};

export const saveCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new Event('cartUpdated'));
};

export const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1): Cart => {
  const cart = getCart();
  
  // Set createdAt if this is a new cart
  if (!cart.createdAt) {
    cart.createdAt = Date.now();
  }
  
  const existingIndex = cart.items.findIndex(
    i => i.productId === item.productId && 
         i.size === item.size && 
         i.color === item.color
  );
  
  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    cart.items.push({ ...item, quantity });
  }
  
  cart.total = calculateTotal(cart.items);
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: string, size?: string, color?: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter(
    item => !(item.productId === productId && item.size === size && item.color === color)
  );
  cart.total = calculateTotal(cart.items);
  saveCart(cart);
  return cart;
};

export const updateQuantity = (productId: string, quantity: number, size?: string, color?: string): Cart => {
  const cart = getCart();
  const item = cart.items.find(
    i => i.productId === productId && i.size === size && i.color === color
  );
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId, size, color);
    }
    item.quantity = quantity;
  }
  
  cart.total = calculateTotal(cart.items);
  saveCart(cart);
  return cart;
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new Event('cartUpdated'));
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
};
