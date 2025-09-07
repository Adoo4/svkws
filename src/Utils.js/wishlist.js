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
export const isInWishlist = (book) => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item._id === book._id);
};

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
  if (isInWishlist(book)) {
    removeFromWishlist(book);
  } else {
    addToWishlist(book);
  }
};
