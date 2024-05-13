"use client";
import { createContext, useState } from "react";

export type TUser = {
  id: number;
  photo: string;
  fullName: string;
  email: string;
  gender: string;
  location: {
    lat: number | null;
    lng: number | null;
    city: string;
    state: string;
    country: string;
  };
  companyName?: string;
  designation?: string;
};

type TContext = {
  isMapView: boolean;
  setIsMapView: React.Dispatch<React.SetStateAction<boolean>>;
  selUser: number | null;
  setSelUser: React.Dispatch<React.SetStateAction<number | null>>;
};

const MapContext = createContext<TContext | null>(null);

function MapContextProvider({ children }: { children: React.ReactNode }) {
  const [isMapView, setIsMapView] = useState(true);
  const [selUser, setSelUser] = useState<number | null>(null);

  return (
    <MapContext.Provider
      value={{
        isMapView,
        setIsMapView,
        selUser,
        setSelUser,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
