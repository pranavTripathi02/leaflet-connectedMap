"use client";

import useMapContext from "@/hooks/useMapContext";
import ListUserCard from "./listUserCard";
import { useState } from "react";
import { useInstantSearch } from "react-instantsearch";
import { TUser } from "@/context/mapContext";

function ListView() {
  const [offset, setOffset] = useState(0);
  const { selUser, setSelUser } = useMapContext();
  const { results } = useInstantSearch();

  const showUserDetails = (id: number) => {
    if (selUser === id) {
      setSelUser(null);
    } else {
      setSelUser(id);
    }
  };

  const prevPage = () => {
    if (offset === 0) {
      return;
    }
    setOffset((prev) => (prev -= 10));
  };
  const nextPage = () => {
    if (offset === 1000) {
      return;
    }
    setOffset((prev) => (prev += 10));
  };
  return (
    <section className="h-fit bg-white">
      <div className="container mx-auto max-w-3xl px-8 pt-32">
        <div className="flex flex-col gap-4">
          {results.hits.slice(offset, offset + 10).map((user: TUser) => (
            <ListUserCard
              user={user}
              key={user.id}
              showUserDetails={showUserDetails}
            />
          ))}
        </div>
        <div className="mx-auto flex w-fit gap-8 py-12">
          <button
            className="flex gap-2 border px-4 py-2 disabled:opacity-50"
            onClick={prevPage}
            disabled={offset == 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <div>
              <span>Prev</span>
            </div>
          </button>
          <button
            className="flex gap-2 border px-4 py-2 disabled:opacity-50"
            onClick={nextPage}
            disabled={results.hits.length - offset < 10}
          >
            <div>
              <span>Next</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ListView;
