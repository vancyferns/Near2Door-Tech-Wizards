import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Button from "../../components/UI/Button";
import { useAuth } from "../../context/AuthContext";

// Reusable toast-like message
const Message = ({ message, type }) => {
  if (!message) return null;
  const baseClasses =
    "px-6 py-3 rounded-xl shadow-xl z-50 transition-all transform animate-fade-in-down font-medium";
  const typeClasses = {
    success: "bg-lime-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };
  return (
    <div className={`fixed top-20 right-6 ${baseClasses} ${typeClasses[type]}`}>
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

  // Fetch agents
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
      showMessage("Could not get your location. Please allow location access.", "error");
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
        showMessage("✅ Order placed! Waiting for agent confirmation.", "success", 8000);
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
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {orderMessage.msg && (
          <Message message={orderMessage.msg} type={orderMessage.type} />
        )}

        <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-800">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-lime-400 drop-shadow-md">
            🛒 Your Cart
          </h2>

          {cart.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="space-y-6 mb-10">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between bg-slate-800/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/64x64/1E293B/94A3B8?text=Img";
                            e.target.onerror = null;
                          }}
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400">
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
                        className="w-16 text-center border border-slate-700 bg-slate-900 text-white rounded-lg p-2 focus:border-lime-500 focus:ring focus:ring-lime-400/30"
                      />
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-400 font-medium transition"
                      >
                        ✖ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-xl sm:text-2xl font-bold mb-10 pt-6 border-t border-dashed border-slate-700">
                <span>Total</span>
                <span className="text-lime-400">₹ {totalCartPrice.toFixed(2)}</span>
              </div>

              {/* Delivery Agents */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-white">🚚 Select a Delivery Agent</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {deliveryAgents.length > 0 ? (
                    deliveryAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`p-5 rounded-2xl shadow-md text-left transition-all duration-300 border ${
                          selectedAgent?.id === agent.id
                            ? "border-lime-500 bg-slate-800 text-white"
                            : "border-slate-700 bg-slate-800/60 text-gray-300 hover:border-lime-400 hover:bg-slate-800"
                        }`}
                      >
                        <h4 className="font-bold text-lg">{agent.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {agent.proximity || "Unknown proximity"}
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-400 col-span-full">
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
                  className="bg-lime-600 hover:bg-lime-500 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPlacingOrder ? "Placing Order..." : "Confirm & Place Order"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400 mb-4">Your cart is empty.</p>
              <button
                onClick={() => onNavigate("browse-shops")}
                className="text-lime-400 hover:underline font-semibold"
              >
                Start Shopping →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
