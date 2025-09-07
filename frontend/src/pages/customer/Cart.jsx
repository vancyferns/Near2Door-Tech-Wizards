import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Button from "../../components/UI/Button";
import { useAuth } from "../../context/AuthContext";

// Reusable toast-like message
const Message = ({ message, type }) => {
  if (!message) return null;
  const baseClasses =
    "px-6 py-3 rounded-full shadow-lg z-50 transition-all transform animate-fade-in-down";
  const typeClasses = {
    success: "bg-lime-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };
  return (
    <div className={`fixed top-20 right-4 ${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

const Cart = ({ cart, onNavigate, onUpdateCart }) => {
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState({ msg: "", type: "" });
  const { user } = useAuth();

  const customerId = user?.id || "66843e4e35675d3a5d493293";
  const shopId = cart[0]?.shop_id || null;
  const deliveryFee = 20;

  // Utility to show toast
  const showMessage = (msg, type, duration = 4000) => {
    setOrderMessage({ msg, type });
    setTimeout(() => setOrderMessage({ msg: "", type: "" }), duration);
  };

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agents = await api.getAgents();
        setDeliveryAgents(Array.isArray(agents) ? agents : []);
      } catch (e) {
        console.error("Error fetching agents:", e);
        setDeliveryAgents([]);
        showMessage("Failed to fetch delivery agents.", "error");
      }
    };
    fetchAgents();
  }, []);

  const totalCartPrice = (cart || []).reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleUpdateQuantity = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    onUpdateCart(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    onUpdateCart(updatedCart);
    showMessage("Item removed from cart.", "info");
  };

  const handlePlaceOrder = async () => {
    let customerLocation = null;
    try {
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported."));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });
      customerLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (e) {
      console.error("Geolocation error:", e);
      showMessage(
        "Could not get your location. Please grant location access.",
        "error"
      );
      return;
    }

    if (!cart.length) {
      showMessage("Your cart is empty.", "error");
      return;
    }

    if (!shopId) {
      showMessage("Shop ID missing from cart items!", "error");
      return;
    }

    if (!selectedAgent?.id) {
      showMessage("Please select a delivery agent.", "error");
      return;
    }

    const items = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity || 1),
    }));

    const orderPayload = {
      customer_id: customerId,
      shop_id: shopId,
      agent_id: selectedAgent.id,
      items,
      delivery_fee: deliveryFee || 0,
      customer_location: customerLocation,
    };

    try {
      setIsPlacingOrder(true);
      showMessage("Placing your order...", "info");

      const { ok, data } = await api.placeOrder(orderPayload);
      if (ok) {
        showMessage(
          "Order placed! Waiting for agent confirmation.",
          "success",
          8000
        );
        onUpdateCart([]);
      } else {
        showMessage(data?.error || "Failed to place order.", "error");
      }
    } catch (e) {
      showMessage("Unexpected error while placing order.", "error");
      console.error("Order placement error:", e);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-[calc(100vh-140px)] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {orderMessage.msg && (
          <Message message={orderMessage.msg} type={orderMessage.type} />
        )}

        <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-6 sm:p-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Your Cart</h2>

          {cart.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/64x64/E2E8F0/94A3B8?text=Img";
                            e.target.onerror = null;
                          }}
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          ₹ {Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, e.target.value)
                        }
                        className="w-16 text-center border-2 border-gray-300 rounded-lg p-2 focus:border-lime-600 focus:ring focus:ring-lime-200"
                      />
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-2xl font-bold mb-8 pt-4 border-t-2 border-dashed border-gray-200">
                <span>Cart Total</span>
                <span>₹ {totalCartPrice.toFixed(2)}</span>
              </div>

              {/* Delivery Agents */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Select a Delivery Agent
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deliveryAgents.length > 0 ? (
                    deliveryAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`p-6 rounded-2xl shadow-md transition-all duration-300 border-2 ${
                          selectedAgent?.id === agent.id
                            ? "border-lime-600 bg-lime-100"
                            : "border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <h4 className="font-bold text-lg">{agent.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {agent.proximity || "Unknown proximity"}
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-600 col-span-full">
                      No delivery agents available.
                    </p>
                  )}
                </div>
              </div>

              {/* Place Order */}
              <div className="flex justify-center">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!selectedAgent || isPlacingOrder}
                >
                  {isPlacingOrder ? "Placing Order..." : "Confirm and Place Order"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
              <button
                onClick={() => onNavigate("browse-shops")}
                className="text-lime-600 hover:underline font-semibold"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
