import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';

const Cart = ({ cart, onNavigate, onUpdateCart }) => {
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const { user } = useAuth();

  const customerId = user?.id || '66843e4e35675d3a5d493293';
  const shopId = cart[0]?.shop_id || null; // assuming all items belong to the same shop
  const deliveryFee = 20; // set default delivery fee or compute dynamically

  useEffect(() => {
    const fetchDeliveryAgents = async () => {
      try {
        const agents = await api.getAgents();
        setDeliveryAgents(Array.isArray(agents) ? agents : []);
      } catch (e) {
        console.error('Error fetching agents:', e);
        setDeliveryAgents([]);
      }
    };
    fetchDeliveryAgents();
  }, []);

  const totalCartPrice = (cart || []).reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cart
      .map(item =>
        item.id === productId ? { ...item, quantity: parseInt(newQuantity) } : item
      )
      .filter(item => item.quantity > 0);
    onUpdateCart(updatedCart);
  };

  const handleRemoveItem = productId => {
    const updatedCart = cart.filter(item => item.id !== productId);
    onUpdateCart(updatedCart);
  };

  

  const handlePlaceOrder = async () => {
    let customerLocation = null;
try {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  customerLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
} catch (e) {
  console.error("Geolocation error:", e);
  alert("Could not get your location. Please grant location access and try again.");
  setIsPlacingOrder(false);
  return;
}

    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

    if (!shopId) {
      alert("Shop ID is missing from cart items!");
      return;
    }

    if (!selectedAgent?.id) {
      alert("Please select a delivery agent");
      return;
    }

    const items = cart.map(item => ({
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
      customer_location: customerLocation 
    };

    try {
      setIsPlacingOrder(true);
      setOrderMessage('Placing your order...');

      const { ok, data } = await api.placeOrder(orderPayload);
      if (ok) {
        setOrderMessage('Order placed successfully! Waiting for confirmation by delivery agent.');
        onUpdateCart([]); // clear cart
      } else {
        setOrderMessage(data.error || 'Failed to place order.');
      }
    } catch (e) {
      setOrderMessage('An unexpected error occurred while placing your order.');
      console.error('Order placement error:', e);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="p-10 bg-white rounded-2xl shadow-2xl mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="space-y-6 mb-8">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  {item.images?.[0] && (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">₹ {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => handleUpdateQuantity(item.id, e.target.value)}
                    className="w-16 text-center border rounded-lg p-2"
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

          <div className="text-right text-2xl font-bold text-gray-900 mb-8">
            Total: ₹ {totalCartPrice.toFixed(2)}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select a Delivery Agent</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliveryAgents.length > 0 ? (
                deliveryAgents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-4 rounded-xl shadow-md transition-all duration-300 border-2 ${
                      selectedAgent?.id === agent.id
                        ? 'border-lime-600 bg-lime-50'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <h4 className="font-semibold">{agent.name}</h4>
                    <p className="text-sm text-gray-500">{agent.proximity || ''}</p>
                  </button>
                ))
              ) : (
                <p className="text-gray-600">No delivery agents available at the moment.</p>
              )}
            </div>
          </div>

          {orderMessage && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                orderMessage.includes('successfully')
                  ? 'bg-lime-100 text-lime-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {orderMessage}
            </div>
          )}

          <Button onClick={handlePlaceOrder} disabled={!selectedAgent || isPlacingOrder}>
            {isPlacingOrder ? 'Placing Order...' : 'Confirm and Place Order'}
          </Button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => onNavigate('browse-shops')}
            className="text-lime-600 hover:underline"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
