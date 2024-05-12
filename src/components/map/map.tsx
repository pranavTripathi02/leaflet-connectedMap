"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import useMapContext from "@/hooks/useMapContext";
import { useEffect, useState } from "react";
import Loading from "../loading";

const MAPCENTER: L.LatLngTuple = [0, 0];
const MAPZOOM = 4;
const MAPZOOM_MIN = 4;
const MAPZOOM_MAX = 12;
// TODO:
// marker icon
// cluster icon
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
        return L.divIcon({
          html:
            "<div class='w-8 h-8 text-center bg-transparent'>" +
            cluster.getChildCount() +
            "</div>",
          iconSize: [32, 32],
          className: "bg-transparent",
        });
      },
    });
    userList.forEach(
      (user) =>
        user.location.lat &&
        user.location.lng &&
        markers.addLayer(
          L.marker([user.location.lat, user.location.lng], {
            icon: L.divIcon({
              html: `
            <div class="flex gap-4 rounded min-w-fit w-full px-4 py-2 bg-white/80 items-center relative">
            <div class="rounded-full overflow-hidden w-8 h-8 object-cover">
                <img src=${user.photo} alt=${user.fullName} width="32" height="32" class="object-cover"></img>
            </div>
            <div className="flex flex-col gap-2">
            <p class="whitespace-nowrap">${user.fullName}</p>
            <p class="whitespace-nowrap">${user.companyName ? user.companyName + (user.designation ? ", " + user.designation : null) : null}</p>
            </div>
            <span class="rotate-45 -bottom-2 mx-auto left-0 right-0 absolute w-8 h-8 bg-white/80 -z-10"></span>
            </div>
            `,
              className: "",
            }),
            alt: `${user.fullName} map icon`,
            riseOnHover: true,
            autoPanOnFocus: true,
            title: user.fullName,
            interactive: true,
          }),
        ),
    );
    map.addLayer(markers);
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
      {/*         icon={L.icon({ iconUrl: markerUrl, iconSize: [48, 48] })} */}
      {/*       /> */}
      {/*     ); */}
      {/*   })} */}
    </MapContainer>
  );
}

export default Map;
