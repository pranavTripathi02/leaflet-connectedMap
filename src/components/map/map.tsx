"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Mapview() {
  return (
    <MapContainer
      className="w-full h-full"
      center={[51.505, -0.09]}
      zoom={4}
      minZoom={3}
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Mapview;
