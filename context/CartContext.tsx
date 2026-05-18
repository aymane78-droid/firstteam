"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  createCart,
  addLinesToCart,
  removeLinesFromCart,
  updateCartLines,
  getCart,
  type Cart,
  type CartLineInput,
} from "@/lib/shopify-queries";

const STORAGE_KEY = "firstteam_cart_id";

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  loading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (!storedId) return;
    getCart(storedId)
      .then((fetched) => {
        if (fetched) {
          setCart(fetched);
          setCartId(storedId);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      })
      .catch(() => localStorage.removeItem(STORAGE_KEY));
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number) => {
      setLoading(true);
      try {
        const line: CartLineInput = { merchandiseId: variantId, quantity };
        let updated: Cart;
        if (cartId) {
          updated = await addLinesToCart(cartId, [line]);
        } else {
          updated = await createCart([line]);
          localStorage.setItem(STORAGE_KEY, updated.id);
          setCartId(updated.id);
        }
        setCart(updated);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [cartId]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setLoading(true);
      try {
        setCart(await removeLinesFromCart(cartId, [lineId]));
      } finally {
        setLoading(false);
      }
    },
    [cartId]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      if (quantity <= 0) { await removeFromCart(lineId); return; }
      setLoading(true);
      try {
        setCart(await updateCartLines(cartId, [{ id: lineId, quantity }]));
      } finally {
        setLoading(false);
      }
    },
    [cartId, removeFromCart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
