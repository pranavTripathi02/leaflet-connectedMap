"use client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerIcon from "./marker";
import { renderToString } from "react-dom/server";
import { TUser } from "@/context/mapContext";
import useMapContext from "@/hooks/useMapContext";

function Map() {
  const { userList, searchTerm } = useMapContext();
  const filterUsers = (userList: TUser[]) => {
    let newFilteredUserList = userList.slice();
    if (searchTerm.length > 1) {
      newFilteredUserList = userList.filter((user) =>
        user.fullName
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchTerm.toLowerCase().split(" ").join("")),
      );
    }
    return newFilteredUserList;
  };
  const filteredUserList = filterUsers(userList);
  return (
    <MapContainer
      className="z-0 h-full w-full"
      center={[51.505, -0.09]}
      zoom={4}
      minZoom={4}
      maxZoom={12}
      touchZoom
      inertia
      dragging
      bounceAtZoomLimits
      worldCopyJump
      zoomControl={false}
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredUserList.map((user) => {
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

export default Map;
