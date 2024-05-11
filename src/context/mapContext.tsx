"use client";
import { createContext, useEffect, useState } from "react";
import userData from "../../data/data.json";

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
  userList: TUser[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selUser: TUser | null;
  setSelUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const MapContext = createContext<TContext | null>(null);

function MapContextProvider({ children }: { children: React.ReactNode }) {
  const [userList, setUserList] = useState<TUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selUser, setSelUser] = useState<TUser | null>(null);

  useEffect(() => {
    const fetchUsers = () => {
      setUserList(userData);
    };
    fetchUsers();
  }, []);

  return (
    <MapContext.Provider
      value={{ userList, searchTerm, setSearchTerm, selUser, setSelUser }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
