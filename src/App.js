import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import CheckoutPage from "./Pages/Checkout";
import BookDetail from "./Pages/BookDetail";
import CompleteProfile from "./Pages/CompleteProfile";
import AuthRedirect from "./Components/AuthRedirect";
import CartMenu from "./Components/CartMenu";
import LoadingDevice from "./Pages/Loading";
import { SignIn, SignUp } from "@clerk/clerk-react";
import WishlistDrawer from "./Components/WishlistDrawer";
import { SnackbarProvider } from "notistack";
import AuthNotifier from "./Components/SignIn/AuthNotifier.jsx"; // <-- import it
import Uslovikupovine from "./Pages/Uslovikupovine.jsx";
import Privatnost from "./Pages/Privatnost.jsx";
import OpštiUsloviPoslovanja from "./Pages/OpštiUsloviPoslovanja.jsx";
import PolitikaPovrataiReklamacije from "./Pages/PolitikaPovrata.jsx";
import Sigurnost from "./Pages/Sigurnost.jsx";
import PolitikaKolačića from "./Pages/Politikekolačića.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";

import useCart from "./Utils.js/useCart.js";
import useWishlist from "./Utils.js/useWishlist.js"; // path to your hook

function App() {
  const { cart, addToCart, updateCartItem, removeCartItem, clearCart } = useCart();
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();
  const [cartMenu, setCartMenu] = useState(false);


  // Keep localStorage in sync when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const [drawerOpen3, setDrawerOpen3] = useState(false);

  const [loading, setLoading] = useState(true);
  const imageUrl = "https://i.postimg.cc/T38Bvycw/funny-image-with-kid.jpg"; 



  useEffect(() => {
    // If user visited before, skip loading
    if (sessionStorage.getItem("hasVisitedBefore")) {
      setLoading(false);
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      sessionStorage.setItem("hasVisitedBefore", "true");
      setTimeout(() => setLoading(false), 6000); // optional delay
    };
    img.onerror = () => setLoading(false);
  }, []);

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
              zIndex: 100000, // higher than BottomNavigation (9999)
              marginBottom: "60px", // lift above bottom nav
            }}
          >
            <props.Component {...props} />
          </div>
        ),
      }}
    >
      <Router>
        {loading ? (
          <LoadingDevice /> // show loader while loading
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* Navbar */}
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
              drawerOpen3={drawerOpen3}
              setDrawerOpen3={setDrawerOpen3}
            />

            <AuthNotifier />
            {/* Main content */}
            <main style={{ flex: 1, overflow: "hidden", background:"white" }}>
              <AuthRedirect />

              <Routes>
                <Route
                  path="/home"
                  element={<Home setCartMenu={setCartMenu} />}
                />
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
                <Route
                  path="/checkout"
                  element={<CheckoutPage cart={cart} />}
                />
               
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                  path="/sign-up"
                  element={<SignUp afterSignUpUrl="/complete-profile" />}
                />
                <Route path="/complete-profile" element={<CompleteProfile />} />
                <Route
                  path="/:id"
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
                <Route
                  path="/PolitikaKolačića"
                  element={<PolitikaKolačića />}
                />
              
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        )}

        {/* Cart overlay */}
        <CartMenu
          cart={cart}
          cartMenu={cartMenu}
          setCartMenu={setCartMenu}
          updateCartItem={updateCartItem}
          removeCartItem={removeCartItem}
          clearCart={clearCart}
        />

        <WishlistDrawer
  open={drawerOpen3}
  onClose={() => setDrawerOpen3(false)}
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
