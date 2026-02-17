import { create } from "zustand";

const useUIStore = create((set) => ({
  cartMenu: false,
  wishlistOpen: false,
  cartItemCount: 0,
  wishlistCount: 0,
  loadingCart: false,
  loadingWishlist: false,

  setCartMenu: (value) =>
    set((state) => ({
      cartMenu: typeof value === "function" ? value(state.cartMenu) : value,
    })),
  setWishlistOpen: (value) =>
    set((state) => ({
      wishlistOpen:
        typeof value === "function" ? value(state.wishlistOpen) : value,
    })),
  toggleCartMenu: () => set((state) => ({ cartMenu: !state.cartMenu })),
  toggleWishlistOpen: () =>
    set((state) => ({ wishlistOpen: !state.wishlistOpen })),

  setCartItemCount: (count) => set({ cartItemCount: count || 0 }),
  setWishlistCount: (count) => set({ wishlistCount: count || 0 }),
  setLoadingCart: (loading) => set({ loadingCart: Boolean(loading) }),
  setLoadingWishlist: (loading) => set({ loadingWishlist: Boolean(loading) }),
}));

export default useUIStore;
