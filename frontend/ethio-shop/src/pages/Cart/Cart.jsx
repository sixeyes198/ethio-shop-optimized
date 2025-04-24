import React from "react";
import { useState } from "react";



const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Running Shoes",
      image: "https://via.placeholder.com/100",
      price: 89.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      image: "https://via.placeholder.com/100",
      price: 49.99,
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: 0 } : item
    );
    setCartItems(updatedItems);
  };

  // Only include items with quantity > 0 in summary
  const filteredItems = cartItems.filter((item) => item.quantity > 0);
  const subtotal = filteredItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = filteredItems.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl mt-10 mb-8 font-semibold px-4 text-amber-500">Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between bg-white rounded-xl shadow p-4 ${
                item.quantity === 0 ? "opacity-40" : ""
              }`}
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
                    htmlFor={`qty-${item.id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Qty
                  </label>
                  <select
                    id={`qty-${item.id}`}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
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
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
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
