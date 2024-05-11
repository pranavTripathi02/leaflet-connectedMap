import { MapContext } from "@/context/mapContext";
import { useContext } from "react";

function useMapContext() {
  const ctx = useContext(MapContext);
  if (ctx == null) {
    throw new Error("Cannot initialize map context");
  }

  return ctx;
}

export default useMapContext;
