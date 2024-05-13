"use client";
import ListView from "@/components/list/listView";
import { MapView } from "@/components/map";
import Topbar from "@/components/topbar";
import useMapContext from "@/hooks/useMapContext";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch";

export default function Home() {
  const { isMapView } = useMapContext();
  return (
    <main className="h-dvh w-dvw">
      <InstantSearch
        searchClient={algoliasearch(
          "K0YEFRGDBW",
          "67715d8745d998ffab96ca1c05fe9c31",
        )}
        indexName="epyc_test"
      >
        <div className="relative">
          <Topbar />
        </div>
        {isMapView ? <MapView /> : <ListView />}
      </InstantSearch>
    </main>
  );
}
