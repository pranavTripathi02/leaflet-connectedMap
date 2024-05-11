import { Map, MapTopBar } from "./index";

function MapView() {
  return (
    <div className="h-dvh w-dvw">
      <div className="relative mx-4 md:mx-20">
        <MapTopBar />
      </div>
      <Map />
    </div>
  );
}

export default MapView;
