// Wishlist utilities
export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  addedAt: number;
}

const WISHLIST_KEY = 'lkj_tennis_wishlist';

// Get wishlist from localStorage
export const getWishlist = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(WISHLIST_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlist = (items: WishlistItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  // Dispatch event for UI updates
  window.dispatchEvent(new Event('wishlistUpdated'));
};

// Add item to wishlist
export const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>): boolean => {
  const wishlist = getWishlist();
  
  // Check if already in wishlist
  const exists = wishlist.some(i => i.productId === item.productId);
  if (exists) return false;
  
  wishlist.push({
    ...item,
    addedAt: Date.now(),
  });
  
  saveWishlist(wishlist);
  return true;
};

// Remove item from wishlist
export const removeFromWishlist = (productId: string): void => {
  const wishlist = getWishlist();
  const filtered = wishlist.filter(item => item.productId !== productId);
  saveWishlist(filtered);
};

// Check if item is in wishlist
export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
};

// Toggle wishlist item
export const toggleWishlist = (item: Omit<WishlistItem, 'addedAt'>): boolean => {
  if (isInWishlist(item.productId)) {
    removeFromWishlist(item.productId);
    return false; // Removed
  } else {
    addToWishlist(item);
    return true; // Added
  }
};

// Get wishlist count
export const getWishlistCount = (): number => {
  return getWishlist().length;
};

// Clear wishlist
export const clearWishlist = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WISHLIST_KEY);
  window.dispatchEvent(new Event('wishlistUpdated'));
};
