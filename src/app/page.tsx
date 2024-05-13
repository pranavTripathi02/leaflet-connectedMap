"use client";
import ListView from "@/components/list/listView";
import { MapTopBar, MapView } from "@/components/map";
import useMapContext from "@/hooks/useMapContext";

export default function Home() {
  const { isMapView } = useMapContext();
  return (
    <main className="h-dvh w-dvw">
      <div className="relative mx-4 md:mx-20">
        <MapTopBar />
      </div>
      {isMapView ? <MapView /> : <ListView />}
    </main>
  );
}
