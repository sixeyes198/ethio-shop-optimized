import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/api/products");
        const productsWithQuantity = res.data.map((product) => ({
          ...product,
          quantity: product.quantity || 0,
        }));
        setCartItems(productsWithQuantity);
      } catch (err) {
        console.error("Error loading products", err);
      }
    };
    fetchProducts();
  }, []);

  // Update quantity and save to DB
  const handleQuantityChange = async (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCartItems(updatedItems);
    try {
      await axiosInstance.put(`/api/products/${id}`, {
        quantity: parseInt(newQuantity),
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  //Set quantity to 0
  const handleRemove = async (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: 0 } : item
    );
    setCartItems(updatedItems);
    try {
      await axiosInstance.put(`/api/products/${id}`, { quantity: 0 });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Only include items with quantity > 0 in summary
  const filteredItems = cartItems.filter((item) => item.quantity > 0);
  const subtotal = filteredItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = filteredItems.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  // CHECKOUT
  const makePayment = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/payments/create-checkout-session",
        {
          items: filteredItems,
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Error creating checkout session");
      }
    } catch (error) {
      alert("Error: Unable to process payment");
      console.error(error);
    }
  };
  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#success") {
      alert("✅ Payment successful!");
      window.location.hash = "";
      window.location.replace("/");
    }

    if (hash === "#cancel") {
      alert("❌ Payment was cancelled");
      window.location.hash = "";
      window.location.replace("/");
    }
  }, []);

  return (
    <div id="Shopping-Cart" className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl mt-10 mb-8 font-semibold px-4 text-amber-500">
        Products In Stock
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2 space-y-6">
          {filteredItems.length === 0 ? (
            <p className="text-gray-500">No products in cart.</p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white rounded-xl shadow p-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <label
                      htmlFor={`qty-${item._id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Qty
                    </label>
                    <select
                      id={`qty-${item._id}`}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, e.target.value)
                      }
                      className="mt-1 block w-20 py-1 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    >
                      {[0, 1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={makePayment}
            className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
            disabled={filteredItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
