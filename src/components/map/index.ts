import dynamic from "next/dynamic";
import MapTopBar from "./mapTopBar";
import MapView from "./mapView";

const Map = dynamic(() => import("./map"), {
  ssr: false,
});

export { MapView, MapTopBar, Map };
