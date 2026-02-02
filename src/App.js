import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { SnackbarProvider } from "notistack";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer";
import CartMenu from "./Components/CartMenu";
import WishlistDrawer from "./Components/WishlistDrawer";
import AuthRedirect from "./Components/AuthRedirect";
import AuthNotifier from "./Components/SignIn/AuthNotifier.jsx";
import AdminRoute from "./admin/AdminRoute";

import useCart from "./Utils.js/useCart.js";
import useWishlist from "./Utils.js/useWishlist.js";

/* =======================
   🔥 LAZY-LOADED PAGES
   ======================= */
const Home = lazy(() => import("./Pages/Home"));
const Shop = lazy(() => import("./Pages/Shop"));
const CheckoutPage = lazy(() => import("./Pages/Checkout"));
const BookDetail = lazy(() => import("./Pages/BookDetail"));
const CompleteProfile = lazy(() => import("./Pages/CompleteProfile"));
const PaymentSuccess = lazy(() => import("./Pages/PaymentSuccess.jsx"));
const PaymentCancel = lazy(() => import("./Pages/PaymentCancel.jsx"));

const Uslovikupovine = lazy(() => import("./Pages/Uslovikupovine.jsx"));
const Privatnost = lazy(() => import("./Pages/Privatnost.jsx"));
const OpštiUsloviPoslovanja = lazy(() =>
  import("./Pages/OpštiUsloviPoslovanja.jsx")
);
const PolitikaPovrataiReklamacije = lazy(() =>
  import("./Pages/PolitikaPovrata.jsx")
);
const Sigurnost = lazy(() => import("./Pages/Sigurnost.jsx"));
const PolitikaKolačića = lazy(() =>
  import("./Pages/Politikekolačića.jsx")
);

const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

function App() {
  const { cart, addToCart, updateCartItem, removeCartItem, clearCart } =
    useCart();
  const { wishlist, addToWishlist, removeFromWishlist, clearWishlist } =
    useWishlist();

  const [cartMenu, setCartMenu] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            cart={cart}
            cartMenu={cartMenu}
            setCartMenu={setCartMenu}
            addToCart={addToCart}
            updateCartItem={updateCartItem}
            removeCartItem={removeCartItem}
            wishlistOpen={wishlistOpen}
            setWishlistOpen={setWishlistOpen}
          />

          <AuthNotifier />

          <main style={{ flex: 1, overflow: "hidden", background: "white" }}>
            <AuthRedirect />

            {/* 🚀 ROUTE-LEVEL CODE SPLITTING */}
            <Suspense fallback={null}>
              <Routes>
                <Route path="/home" element={<Home setCartMenu={setCartMenu} />} />

                <Route
                  path="/shop"
                  element={
                    <Shop
                      cart={cart}
                      cartMenu={cartMenu}
                      setCartMenu={setCartMenu}
                      wishlist={wishlist}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      clearWishlist={clearWishlist}
                      addToCart={addToCart}
                      updateCartItem={updateCartItem}
                      removeCartItem={removeCartItem}
                    />
                  }
                />

                <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/payment-cancel" element={<PaymentCancel />} />

                <Route path="/sign-in" element={<SignIn />} />
                <Route
                  path="/sign-up"
                  element={<SignUp afterSignUpUrl="/complete-profile" />}
                />
                <Route path="/complete-profile" element={<CompleteProfile />} />

                <Route
                  path="/books/:slug"
                  element={
                    <BookDetail
                      cart={cart}
                      cartMenu={cartMenu}
                      setCartMenu={setCartMenu}
                      wishlist={wishlist}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      clearWishlist={clearWishlist}
                      addToCart={addToCart}
                      updateCartItem={updateCartItem}
                    />
                  }
                />

                <Route path="/UsloviKupovine" element={<Uslovikupovine />} />
                <Route path="/Privatnost" element={<Privatnost />} />
                <Route
                  path="/OpštiUsloviPoslovanja"
                  element={<OpštiUsloviPoslovanja />}
                />
                <Route
                  path="/PolitikaPovrataiReklamacije"
                  element={<PolitikaPovrataiReklamacije />}
                />
                <Route path="/Sigurnost" element={<Sigurnost />} />
                <Route path="/PolitikaKolačića" element={<PolitikaKolačića />} />

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/home" replace />} />

                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>

        <CartMenu
          cart={cart}
          cartMenu={cartMenu}
          setCartMenu={setCartMenu}
          updateCartItem={updateCartItem}
          removeCartItem={removeCartItem}
          clearCart={clearCart}
        />

        <WishlistDrawer
          open={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          wishlist={wishlist}
          addToWishlist={addToWishlist}
          removeFromWishlist={removeFromWishlist}
          clearWishlist={clearWishlist}
          addToCart={addToCart}
        />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
