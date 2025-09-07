import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../../api/api";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapView = ({ orderId, role }) => {
  const mapRef = useRef(null);
  const agentMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);

  useEffect(() => {
    // Init map
    mapRef.current = L.map(`map-${orderId}`).setView([0, 0], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const fetchLocations = async () => {
      try {
        // You need an endpoint like /orders/:id/tracking
        const res = await api.getOrderTracking(orderId);
        if (!res || !res.customer_location || !res.agent_location) return;

        const { customer_location, agent_location } = res;

        // Add/update customer marker
        if (!customerMarkerRef.current) {
          customerMarkerRef.current = L.marker([customer_location.lat, customer_location.lng])
            .addTo(mapRef.current)
            .bindPopup("📍 You");
        } else {
          customerMarkerRef.current.setLatLng([customer_location.lat, customer_location.lng]);
        }

        // Add/update agent marker
        if (!agentMarkerRef.current) {
          agentMarkerRef.current = L.marker([agent_location.lat, agent_location.lng], {
            icon: L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [35, 35],
            }),
          })
            .addTo(mapRef.current)
            .bindPopup("🚚 Delivery Agent");
        } else {
          agentMarkerRef.current.setLatLng([agent_location.lat, agent_location.lng]);
        }

        // Fit bounds
        const bounds = L.latLngBounds([
          [customer_location.lat, customer_location.lng],
          [agent_location.lat, agent_location.lng],
        ]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      } catch (err) {
        console.error("Error fetching tracking data:", err);
      }
    };

    // Initial fetch + interval
    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);

    return () => {
      clearInterval(interval);
      mapRef.current.remove();
    };
  }, [orderId, role]);

  return <div id={`map-${orderId}`} className="w-full h-full" />;
};

export default MapView;
