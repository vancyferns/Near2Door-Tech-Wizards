import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Red marker for customer
const redIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 39">
        <path fill="red" stroke="white" stroke-width="2" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 27 12 27s12-18 12-27c0-6.6-5.4-12-12-12z"/>
      </svg>
    `),
  iconSize: [24, 39],
  iconAnchor: [12, 39],
  popupAnchor: [0, -35],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Blue marker for agent
const blueIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 39">
        <path fill="blue" stroke="white" stroke-width="2" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 27 12 27s12-18 12-27c0-6.6-5.4-12-12-12z"/>
      </svg>
    `),
  iconSize: [24, 39],
  iconAnchor: [12, 39],
  popupAnchor: [0, -35],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MapTracker = ({ mapId = 'map', agentLocation, customerLocation }) => {
  const mapRef = useRef(null);
  const agentMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const routeLineRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapId).setView([20.5937, 78.9629], 5); // default view
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, [mapId]);

  // Update markers & route
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let agentLat = agentLocation?.lat;
    let agentLng = agentLocation?.lng;
    const custLat = customerLocation?.lat;
    const custLng = customerLocation?.lng;

    // Handle overlapping markers
    if (
      agentLat != null &&
      agentLng != null &&
      custLat != null &&
      custLng != null &&
      agentLat === custLat &&
      agentLng === custLng
    ) {
      agentLat = agentLat + 0.0001;
      agentLng = agentLng + 0.0001;
    }

    // Agent marker
    if (agentLat != null && agentLng != null) {
      const agentLatLng = [agentLat, agentLng];
      if (agentMarkerRef.current) {
        agentMarkerRef.current.setLatLng(agentLatLng);
      } else {
        agentMarkerRef.current = L.marker(agentLatLng, { icon: blueIcon }).addTo(map);
      }
      agentMarkerRef.current.bindPopup('Your Location');
    }

    // Customer marker
    if (custLat != null && custLng != null) {
      const customerLatLng = [custLat, custLng];
      if (customerMarkerRef.current) {
        customerMarkerRef.current.setLatLng(customerLatLng);
      } else {
        customerMarkerRef.current = L.marker(customerLatLng, { icon: redIcon }).addTo(map);
      }
      customerMarkerRef.current.bindPopup('Customer Location');
    }

    // Route line
    if (agentLat != null && agentLng != null && custLat != null && custLng != null) {
      const points = [
        [agentLat, agentLng],
        [custLat, custLng],
      ];
      if (routeLineRef.current) {
        routeLineRef.current.setLatLngs(points);
      } else {
        routeLineRef.current = L.polyline(points, { color: 'green', weight: 4 }).addTo(map);
      }

      // Calculate distance (Haversine formula)
      const R = 6371; // km
      const dLat = ((custLat - agentLat) * Math.PI) / 180;
      const dLon = ((custLng - agentLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((agentLat * Math.PI) / 180) *
          Math.cos((custLat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = (R * c).toFixed(2);

      routeLineRef.current.bindPopup(`Distance: ${distance} km`);
    }

    // Fit map to bounds
    const group = new L.featureGroup();
    if (agentMarkerRef.current) group.addLayer(agentMarkerRef.current);
    if (customerMarkerRef.current) group.addLayer(customerMarkerRef.current);
    if (group.getLayers().length > 0) {
      map.fitBounds(group.getBounds().pad(0.5));
    }
  }, [agentLocation, customerLocation]);

  return <div id={mapId} style={{ height: '400px', width: '100%' }} />;
};

export default MapTracker;
