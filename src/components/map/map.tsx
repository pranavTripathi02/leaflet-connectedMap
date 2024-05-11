"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import useMapContext from "@/hooks/useMapContext";
import { useEffect, useState } from "react";
import Loading from "../loading";

function Map() {
  const { userList } = useMapContext();
  const [mount, setMount] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);
  console.log();
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return <Loading />;
  }
  const mapOpts = () => {
    if (!map) return;
    map?.zoomControl?.setPosition("bottomright");
    const markers = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({ html: "<b>" + cluster.getChildCount() + "</b>" });
      },
    });
    userList.forEach(
      (user) =>
        user.location.lat &&
        user.location.lng &&
        markers.addLayer(L.marker([user.location.lat, user.location.lng])),
    );
    map.addLayer(markers);
  };
  mapOpts();
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
      ref={setMap}
      whenReady={mapOpts}
    >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {userList && */}
      {/*   userList.map((user) => { */}
      {/*     if (!user.location.lat || !user.location.lng) return null; */}
      {/*     return ( */}
      {/*       <Marker */}
      {/*         key={user.id} */}
      {/*         position={[user.location.lat, user.location.lng]} */}
      {/*         icon={L.divIcon({ */}
      {/*           className: "", */}
      {/*           html: renderToString(<MarkerIcon />), */}
      {/*         })} */}
      {/*       /> */}
      {/*     ); */}
      {/*   })} */}
    </MapContainer>
  );
}

export default Map;
