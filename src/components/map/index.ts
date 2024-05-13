import dynamic from "next/dynamic";
import MapView from "./mapView";

const Map = dynamic(() => import("./map"), {
  ssr: false,
});

export { MapView, Map };
