import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';
import type { Pattern } from '../data/products';

// ── Types ───────────────────────────────────────────────────────────

interface CartState {
  items: Pattern[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Pattern }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Pattern[] };

interface CartContextValue {
  items: Pattern[];
  total: number;
  itemCount: number;
  addItem: (pattern: Pattern) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

// ── Constants ───────────────────────────────────────────────────────

const STORAGE_KEY = 'fff-cart';

// ── Reducer ─────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Digital products: no duplicates
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'LOAD_CART': {
      return { ...state, items: action.payload };
    }

    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ── LocalStorage helpers ────────────────────────────────────────────

function loadCartFromStorage(): Pattern[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Corrupted or unavailable storage — start fresh
  }
  return [];
}

function saveCartToStorage(items: Pattern[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ── Provider ────────────────────────────────────────────────────────

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load persisted cart on mount
  useEffect(() => {
    const savedItems = loadCartFromStorage();
    if (savedItems.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedItems });
    }
  }, []);

  // Persist cart whenever items change
  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  // Derived values
  const total = state.items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = state.items.length;

  // Actions
  const addItem = (pattern: Pattern) => {
    dispatch({ type: 'ADD_ITEM', payload: pattern });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: string): boolean => {
    return state.items.some((item) => item.id === id);
  };

  const value: CartContextValue = {
    items: state.items,
    total,
    itemCount,
    addItem,
    removeItem,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ── Hook ────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
