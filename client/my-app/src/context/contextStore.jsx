import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Contextstore = createContext(null);

export function ContextStore({ children }) {
  const url = "https://project-backend-mtja.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [menuList, setMenuList] = useState([]);
  const [itemCart, setItemCart] = useState({});
  const count = Object.keys(itemCart).length;

  // Fetch Menu Data
  async function fetchData() {
    try {
      const res = await axios.get(`${url}/food/list`);
      setMenuList(res.data.message);
    } catch (err) {
      console.error("Error fetching menu data:", err);
    }
  }

  // Load Cart Data
  async function loadCart() {
    if (!token) return; // Skip if no token
    try {
      const res = await axios.get(`${url}/cart/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItemCart(res.data.message || {});
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }

  // Add Item to Cart
  async function addToCart(itemId) {
    if (!token) return alert("Please login to add items to the cart.");
    setItemCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    try {
      await axios.post(
        `${url}/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add item to cart.");
    }
  }

  // Remove Item from Cart
  async function removeFromCart(itemId) {
    if (!token) return alert("Please login to remove items from the cart.");
    setItemCart((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
    try {
      await axios.post(
        `${url}/cart/remove`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item from cart.");
    }
  }

  // Clear a Specific Item from Cart
  async function clear(itemId) {
    if (!token) return alert("Please login to clear the item.");
    setItemCart((prev) => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
    try {
      await axios.post(
        `${url}/cart/clear`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to clear the item.");
    }
  }

  // Calculate Total
  function calTotal() {
    return Object.entries(itemCart).reduce((sum, [itemId, quantity]) => {
      const product = menuList.find((item) => item._id === itemId);
      return sum + (product?.price || 0) * quantity;
    }, 0);
  }

  // Login
  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  // Logout
  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setItemCart({});
  }

  // React to Token Changes (Refresh Cart)
  useEffect(() => {
    if (token) {
      loadCart(); // Load cart if token is set
    } else {
      setItemCart({}); // Clear cart if no token
    }
  }, [token]);

  // Initial Load
  useEffect(() => {
    fetchData(); // Fetch menu data on initial load
  }, []);

  const initialValues = {
    menuList,
    itemCart,
    addToCart,
    removeFromCart,
    clear,
    calTotal,
    count,
    url,
    setToken: login,
    token,
    logout,
  };

  return (
    <Contextstore.Provider value={initialValues}>
      {children}
    </Contextstore.Provider>
  );
}
