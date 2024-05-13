"use client";
import { createContext, useEffect, useState } from "react";
import userList from "../../data/data.json";

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
  userList: TUser[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selUser: number | null;
  setSelUser: React.Dispatch<React.SetStateAction<number | null>>;
};

const MapContext = createContext<TContext | null>(null);

function MapContextProvider({ children }: { children: React.ReactNode }) {
  const [isMapView, setIsMapView] = useState(true);
  const [filteredUserList, setFilteredUserList] = useState<TUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selUser, setSelUser] = useState<number | null>(null);

  const filterUsers = () => {
    let newFilteredUserList = userList.slice();
    if (searchTerm.length > 1) {
      newFilteredUserList = userList.filter((user) =>
        user.fullName.toLowerCase().split(" ").join("").includes(searchTerm),
      );
    }
    return newFilteredUserList;
  };
  useEffect(() => {
    setFilteredUserList(filterUsers());
  }, [searchTerm]);

  useEffect(() => {
    // const fetchUsers = () => {
    //   setUserList(userData);
    // };
    // fetchUsers();
    setFilteredUserList(filterUsers());
  }, []);

  return (
    <MapContext.Provider
      value={{
        isMapView,
        setIsMapView,
        userList: filteredUserList,
        searchTerm,
        setSearchTerm,
        selUser,
        setSelUser,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
