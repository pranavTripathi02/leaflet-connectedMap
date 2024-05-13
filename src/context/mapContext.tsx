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
  updateSelUser: (userId: number) => void;
};

const MapContext = createContext<TContext | null>(null);

function MapContextProvider({ children }: { children: React.ReactNode }) {
  const [isMapView, setIsMapView] = useState(true);
  const [selUser, setSelUser] = useState<number | null>(null);

  const updateSelUser = (userId: number) => {
    if (selUser === userId) {
      setSelUser(null);
    } else {
      setSelUser(userId);
    }
  };

  return (
    <MapContext.Provider
      value={{
        isMapView,
        setIsMapView,
        selUser,
        updateSelUser,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
