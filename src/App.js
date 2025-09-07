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

function App() {
  const [cart, setCart] = useState([]);
  const [cartMenu, setCartMenu] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [drawerOpen3, setDrawerOpen3] = useState(false); 

   const [loading, setLoading] = useState(true);
  const imageUrl = "https://i.postimg.cc/T38Bvycw/funny-image-with-kid.jpg"; // example
   
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
  
  return  (
      <Router>
  {loading ? (
    <LoadingDevice /> // show loader while loading
  ) : (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar
        wishlist={wishlist}
        setWishlist={setWishlist}
        cart={cart}
        setCartMenu={setCartMenu}
        drawerOpen3={drawerOpen3}
        setDrawerOpen3={setDrawerOpen3}
      />
      

      {/* Main content */}
      <main style={{ flex: 1, overflow: "hidden" }}>
        <AuthRedirect />
       
          <Routes>
            <Route path="/home" element={<Home setCartMenu={setCartMenu} />} />
            <Route
              path="/shop"
              element={
                <Shop
                  cart={cart}
                  setCart={setCart}
                  cartMenu={cartMenu}
                  setCartMenu={setCartMenu}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              }
            />
            <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp afterSignUpUrl="/complete-profile" />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route
              path="/:id"
              element={
                <BookDetail
                  cart={cart}
                  setCart={setCart}
                  cartMenu={cartMenu}
                  setCartMenu={setCartMenu}
                />
              }
            />
             <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
       
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )}

  {/* Cart overlay */}
  <CartMenu
    cart={cart}
    setCart={setCart}
    cartMenu={cartMenu}
    setCartMenu={setCartMenu}
  />

  <WishlistDrawer
  open={drawerOpen3}
  onClose={() => setDrawerOpen3(false)}
  wishlist={wishlist}
  setWishlist={setWishlist}
  
/>
</Router>)
}


export default App;
