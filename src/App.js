import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer";
import AuthRedirect from "./Components/AuthRedirect";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { SnackbarProvider } from "notistack";
import AuthNotifier from "./Components/SignIn/AuthNotifier.jsx";
import AdminRoute from "./admin/AdminRoute";

import useCart from "./Utils.js/useCart.js";
import useWishlist from "./Utils.js/useWishlist.js";

const Home = lazy(() => import("./Pages/Home"));
const Shop = lazy(() => import("./Pages/Shop"));
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
  const { cart, addToCart, updateCartItem, removeCartItem, clearCart, isAdding } =
    useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [cartMenu, setCartMenu] = useState(false);

  // Keep localStorage in sync when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const [wishlistOpen, setWishlistOpen] = useState(false);

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
            cart={cart}
            setCartMenu={setCartMenu}
            setWishlistOpen={setWishlistOpen}
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
                  <Lazy>
                    <Shop
                      setCartMenu={setCartMenu}
                      wishlist={wishlist}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      addToCart={addToCart}
                      isAdding={isAdding}
                    />
                  </Lazy>
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
