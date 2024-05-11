"use client";

import useDebounce from "@/hooks/useDebounce";
import useMapContext from "@/hooks/useMapContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function MapTopBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchbarText, setSearchbarText] = useState("");

  const { setSearchTerm, userList } = useMapContext();
  const debouncedSearchText = useDebounce(searchbarText);
  useEffect(
    () => setSearchTerm(debouncedSearchText.toLowerCase().split(" ").join("")),
    [debouncedSearchText],
  );

  return (
    <div className="back absolute left-0 right-0 top-4 z-20 h-fit w-full rounded bg-black/5 px-4 py-2 md:top-10 md:bg-transparent">
      <div className="flex items-start justify-between">
        <div className="group peer flex flex-col gap-4">
          <div className="group flex w-fit items-center rounded outline-blue-700 focus-within:bg-white focus-within:outline md:bg-white">
            {/* Search Icon */}
            <button
              onClick={() => {
                searchInputRef.current && searchInputRef.current.focus();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search mx-2 group-focus-within:opacity-80 md:opacity-50"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <input
              ref={searchInputRef}
              className="w-0 bg-transparent outline-none duration-200 focus:w-40 focus:px-4 focus:py-2 md:w-96 md:px-4 md:py-2 md:focus:w-96"
              value={searchbarText}
              onChange={(e) => setSearchbarText(e.target.value)}
              placeholder="Search Users"
            />
          </div>
          <div className="hidden max-h-[384px] min-w-fit max-w-[400px] flex-col gap-2 overflow-y-scroll rounded py-4 group-focus-within:flex md:max-h-[512px]">
            {userList.slice(0, 20).map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex w-full items-center gap-4 rounded border-b border-black/5 bg-white px-4 py-4 last:border-0"
                >
                  <div className="h-[64px] w-[64px] rounded-full border-2">
                    {user.photo && (
                      <Image
                        src={user.photo}
                        height={64}
                        width={64}
                        alt={user.fullName}
                        className="break-after-all text-center text-sm"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    {/* name */}
                    <p className="font-bold">{user.fullName}</p>
                    {/* location */}
                    <p className="break-normal">
                      {user.location.city && user.location.city + ", "}
                      {user.location.state && user.location.state + ", "}
                      {user.location.country && user.location.country}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-4 py-2 peer-focus-within:hidden">
          {/* User List Icon */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users-round"
            >
              <path d="M18 21a8 8 0 0 0-16 0" />
              <circle cx="10" cy="8" r="5" />
              <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
            </svg>
          </button>
          {/* Map Icon */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map"
            >
              <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
              <path d="M15 5.764v15" />
              <path d="M9 3.236v15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapTopBar;
