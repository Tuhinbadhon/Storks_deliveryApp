import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon not displaying correctly in React Leaflet
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapModal = ({ latitude, longitude, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn btn-secondary mb-4" onClick={onClose}>
          Close
        </button>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "400px", width: "600px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>Delivery Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapModal;
