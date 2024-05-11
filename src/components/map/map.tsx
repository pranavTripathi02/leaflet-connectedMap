"use client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useMapContext from "@/hooks/useMapContext";
import L from "leaflet";
import MarkerIcon from "./marker";
import { renderToString } from "react-dom/server";

function Mapview() {
  const { userList } = useMapContext();
  console.log(userList);
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
      {userList.map((user) => {
        if (!user.location.lat || !user.location.lng) return null;
        return (
          <Marker
            key={user.id}
            position={[user.location.lat, user.location.lng]}
            icon={L.divIcon({
              className: "",
              html: renderToString(<MarkerIcon />),
            })}
          />
        );
      })}
    </MapContainer>
  );
}

export default Mapview;
