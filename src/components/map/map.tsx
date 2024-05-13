"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useInstantSearch } from "react-instantsearch";
import MarkersCluster from "./markerCluster";
import useMapContext from "@/hooks/useMapContext";
import { TUser } from "@/context/mapContext";

const MAPCENTER: L.LatLngTuple = [0, 0];
const MAPZOOM = 4;
const MAPZOOM_MIN = 4;
const MAPZOOM_MAX = 12;
// TODO:
// cluster icon depending on children
function Map() {
  const [map, setMap] = useState<L.Map | null>(null);
  const { results } = useInstantSearch();
  const { selUser } = useMapContext();

  useEffect(() => {
    if (selUser) {
      const user: TUser = results.hits.find((hit) => hit.id === selUser);
      if (user.location.lat && user.location.lng) {
        console.log("flying to ", selUser);
        map?.flyTo([user.location.lat, user.location.lng]);
      }
    }
  }, [selUser]);

  const mapOpts = () => {
    if (!map) return;
    map?.zoomControl?.setPosition("bottomright");
  };
  mapOpts();
  return (
    <MapContainer
      className="z-0 h-full w-full"
      center={MAPCENTER}
      zoom={MAPZOOM}
      minZoom={MAPZOOM_MIN}
      maxZoom={MAPZOOM_MAX}
      touchZoom
      inertia
      dragging
      bounceAtZoomLimits
      worldCopyJump
      ref={setMap}
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersCluster markers={results.hits} />
    </MapContainer>
  );
}

export default Map;
