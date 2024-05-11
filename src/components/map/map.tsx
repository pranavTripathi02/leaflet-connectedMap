"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerIcon from "./marker";
import { renderToString } from "react-dom/server";
import useMapContext from "@/hooks/useMapContext";
import { useEffect, useState } from "react";
import Loading from "../loading";

function Map() {
  const { userList } = useMapContext();
  const [mount, setMount] = useState(false);
  useEffect(() => setMount(true), []);
  if (!mount) {
    return <Loading />;
  }
  return (
    <MapContainer
      className="z-0 h-full w-full"
      center={[0, 0]}
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
      {userList &&
        userList.map((user) => {
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
