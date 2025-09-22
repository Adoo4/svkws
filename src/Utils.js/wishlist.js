// get wishlist from localStorage
export const getWishlist = () => {
  const stored = localStorage.getItem("wishlist");
  return stored ? JSON.parse(stored) : [];
};

// save wishlist to localStorage
export const setWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

// check if a book is in the wishlist
export function isInWishlist(book) {
  if (!book || !book._id) return false;

  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  return wishlist.some((item) => item && item._id === book._id);
}

// add book to wishlist
export const addToWishlist = (book) => {
  const wishlist = getWishlist();
  if (!isInWishlist(book)) {
    wishlist.push(book);
    setWishlist(wishlist);
  }
};

// remove book from wishlist
export const removeFromWishlist = (book) => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item._id !== book._id);
  setWishlist(wishlist);
};

// toggle wishlist status
export const toggleWishlist = (book) => {
  if (!book || !book._id) return; // guard
  let wishlist = getWishlist() || [];
  const exists = wishlist.some((item) => item._id === book._id);
  if (exists) {
    wishlist = wishlist.filter((item) => item._id !== book._id);
  } else {
    wishlist.push(book);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};