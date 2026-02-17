import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer";
import Shop from "./Pages/Shop";
import AuthRedirect from "./Components/AuthRedirect";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { SnackbarProvider } from "notistack";
import AuthNotifier from "./Components/SignIn/AuthNotifier.jsx";
import AdminRoute from "./admin/AdminRoute";

import useCart from "./Utils.js/useCart.js";
import useWishlist from "./Utils.js/useWishlist.js";
import useUIStore from "./store/uiStore";

const Home = lazy(() => import("./Pages/Home"));
const CartMenu = lazy(() => import("./Components/CartMenu"));
const WishlistDrawer = lazy(() => import("./Components/WishlistDrawer"));
const CheckoutPage = lazy(() => import("./Pages/Checkout"));
const BookDetail = lazy(() => import("./Pages/BookDetail"));
const CompleteProfile = lazy(() => import("./Pages/CompleteProfile"));
const Uslovikupovine = lazy(() => import("./Pages/Uslovikupovine.jsx"));
const Privatnost = lazy(() => import("./Pages/Privatnost.jsx"));
const OpštiUsloviPoslovanja = lazy(() =>
  import("./Pages/OpštiUsloviPoslovanja.jsx")
);
const PolitikaPovrataiReklamacije = lazy(() =>
  import("./Pages/PolitikaPovrata.jsx")
);
const Sigurnost = lazy(() => import("./Pages/Sigurnost.jsx"));
const Politikekolačića = lazy(() =>
  import("./Pages/Politikekolačića.jsx")
);
const PaymentSuccess = lazy(() => import("./Pages/PaymentSuccess.jsx"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const PaymentCancel = lazy(() => import("./Pages/PaymentCancel.jsx"));

const Lazy = ({ children }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

function App() {
  const {
    cart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    isAdding,
    isAddingBook,
    isLoading: isCartLoading,
  } = useCart();
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isLoading: isWishlistLoading,
  } = useWishlist();
  const cartMenu = useUIStore((state) => state.cartMenu);
  const wishlistOpen = useUIStore((state) => state.wishlistOpen);
  const setCartMenu = useUIStore((state) => state.setCartMenu);
  const setWishlistOpen = useUIStore((state) => state.setWishlistOpen);
  const setCartItemCount = useUIStore((state) => state.setCartItemCount);
  const setWishlistCount = useUIStore((state) => state.setWishlistCount);
  const setLoadingCart = useUIStore((state) => state.setLoadingCart);
  const setLoadingWishlist = useUIStore((state) => state.setLoadingWishlist);

  // Keep localStorage in sync when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    const total = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    setCartItemCount(total);
  }, [cart?.items, setCartItemCount]);
  useEffect(() => {
    setWishlistCount(wishlist?.length || 0);
  }, [wishlist, setWishlistCount]);
  useEffect(() => {
    setLoadingCart(isCartLoading);
  }, [isCartLoading, setLoadingCart]);
  useEffect(() => {
    setLoadingWishlist(isWishlistLoading);
  }, [isWishlistLoading, setLoadingWishlist]);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      Components={{
        Snackbar: (props) => (
          <div
            style={{
              zIndex: 100000,
              marginBottom: "60px",
            }}
          >
            <props.Component {...props} />
          </div>
        ),
      }}
    >
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar
            setCartMenu={setCartMenu}
          />

          <AuthNotifier />
          <main style={{ flex: 1, overflow: "hidden", background: "white" }}>
            <AuthRedirect />

            <Routes>
              <Route
                path="/home"
                element={
                  <Lazy>
                    <Home setCartMenu={setCartMenu} />
                  </Lazy>
                }
              />
              <Route
                path="/shop"
                element={
                  <Shop
                    setCartMenu={setCartMenu}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    addToCart={addToCart}
                    isAdding={isAdding}
                    isAddingBook={isAddingBook}
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <Lazy>
                    <CheckoutPage cart={cart} />
                  </Lazy>
                }
              />

              <Route
                path="/success"
                element={
                  <Lazy>
                    <PaymentSuccess />
                  </Lazy>
                }
              />
              <Route
                path="/payment-cancel"
                element={
                  <Lazy>
                    <PaymentCancel />
                  </Lazy>
                }
              />
              <Route path="/sign-in" element={<SignIn />} />
              <Route
                path="/sign-up"
                element={<SignUp afterSignUpUrl="/complete-profile" />}
              />
              <Route
                path="/complete-profile"
                element={
                  <Lazy>
                    <CompleteProfile />
                  </Lazy>
                }
              />
              <Route
                path="/books/:slug"
                element={
                  <Lazy>
                    <BookDetail
                      cart={cart}
                      cartMenu={cartMenu}
                      setCartMenu={setCartMenu}
                      wishlist={wishlist}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      addToCart={addToCart}
                      updateCartItem={updateCartItem}
                    />
                  </Lazy>
                }
              />
              <Route
                path="/UsloviKupovine"
                element={
                  <Lazy>
                    <Uslovikupovine />
                  </Lazy>
                }
              />
              <Route
                path="/Privatnost"
                element={
                  <Lazy>
                    <Privatnost />
                  </Lazy>
                }
              />
              <Route
                path="/OpštiUsloviPoslovanja"
                element={
                  <Lazy>
                    <OpštiUsloviPoslovanja />
                  </Lazy>
                }
              />
              <Route
                path="/PolitikaPovrataiReklamacije"
                element={
                  <Lazy>
                    <PolitikaPovrataiReklamacije />
                  </Lazy>
                }
              />
              <Route
                path="/Sigurnost"
                element={
                  <Lazy>
                    <Sigurnost />
                  </Lazy>
                }
              />
              <Route
                path="/Politikekolačića"
                element={
                  <Lazy>
                    <Politikekolačića />
                  </Lazy>
                }
              />

              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Lazy>
                      <AdminDashboard />
                    </Lazy>
                  </AdminRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>

        {cartMenu && (
          <Lazy>
            <CartMenu
              cart={cart}
              cartMenu={cartMenu}
              setCartMenu={setCartMenu}
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
              clearCart={clearCart}
            />
          </Lazy>
        )}

        {wishlistOpen && (
          <Lazy>
            <WishlistDrawer
              open={wishlistOpen}
              onClose={() => setWishlistOpen(false)}
              addToCart={addToCart}
            />
          </Lazy>
        )}
      </Router>
    </SnackbarProvider>
  );
}

export default App;
