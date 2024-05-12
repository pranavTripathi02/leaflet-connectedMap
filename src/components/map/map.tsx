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
import MarkerIndividualSm from "./markerIndividualSm";
import { on } from "events";
import MarkerIndividualMd from "./markerIndividualMd";

const MAPCENTER: L.LatLngTuple = [0, 0];
const MAPZOOM = 4;
const MAPZOOM_MIN = 4;
const MAPZOOM_MAX = 12;
// TODO:
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
          html: `<div class='w-fit rounded text-center bg-white px-4 py-2'>
            <p class="whitespace-nowrap text-lg">${cluster.getChildCount()} People</p>
            </div>`,
          iconSize: [32, 32],
          className: "",
        });
      },
      animate: true,
    });
    console.log(markers);
    userList.forEach(
      (user) =>
        user.location.lat &&
        user.location.lng &&
        markers.addLayer(
          L.marker([user.location.lat, user.location.lng], {
            icon: MarkerIndividualSm(user),
            alt: `${user.fullName} map icon`,
            riseOnHover: true,
            autoPanOnFocus: true,
            title: user.fullName,
            interactive: true,
          }).on("click", () => {
            user.location.lat &&
              user.location.lng &&
              map.flyTo([user.location.lat!, user.location.lng!]).openPopup(
                L.popup({
                  className: "",
                  content: `
                <div class="flex gap-8 items-center h-fit">
                  <div class="w-16 h-16 overflow-hidden rounded-full border">
                      <img src=${user.photo} alt=${user.fullName} class="w-full h-full object-cover"></img>
                  </div>
                  <div class="flex flex-col gap-0 max-h-fit space-y-2">
                      <span class="whitespace-nowrap text-lg">${user.fullName}</span>
                      <span class="whitespace-nowrap opacity-80">${user.companyName ? user.companyName + (user.designation ? ", " + user.designation : null) : null}</span>
                      <span class="whitespace-nowrap text-sm opacity-60 p-0">${user.location.city ? (user.location.city + ", " + user.location.state ? (user.location.state + ", " + user.location.country ? user.location.country : null) : null) : null}</span>
                  </div>
                </div>
                `,
                  autoClose: true,
                }).setLatLng([user.location.lat!, user.location.lng!]),
              );
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
