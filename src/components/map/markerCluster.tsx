"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { TUser } from "@/context/mapContext";
import MarkerIndividualSm from "./markerIndividualSm";
import PopupHTML from "./popupHtml";

const mcg = L.markerClusterGroup({
  chunkedLoading: true,
  showCoverageOnHover: false,
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

const MarkersCluster = ({ markers }: { markers: TUser[] }) => {
  const map = useMap();
  useEffect(() => {
    mcg.clearLayers();
    markers.map(
      (user: TUser) =>
        user.location.lat &&
        user.location.lng &&
        mcg.addLayer(
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
              map
                ?.flyTo([user.location.lat!, user.location.lng!])
                .openPopup(PopupHTML(user));
          }),
        ),
    );

    // markerList && mcg.addLayers(markerList);
    // map.fitBounds(mcg.getBounds());
    map?.addLayer(mcg);
  }, [markers, map]);

  return null;
};

export default MarkersCluster;
