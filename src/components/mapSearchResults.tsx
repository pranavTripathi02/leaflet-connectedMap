import { TUser } from "@/context/mapContext";
import useMapContext from "@/hooks/useMapContext";
import Image from "next/image";
import { useInstantSearch } from "react-instantsearch";

function SearchResults() {
  const { results } = useInstantSearch();
  const { isMapView, setSelUser } = useMapContext();
  const handleClick = (userId: number) => {
    console.log("clicking");
    setSelUser(userId);
  };
  if (!isMapView) return null;
  return (
    <div className="invisible absolute left-0 right-0 top-16 z-20 mx-auto max-h-[512px] max-w-[400px] overflow-scroll group-focus-within:visible">
      {results.hits.slice(0, 20).map((user: TUser) => (
        <div
          key={user.id}
          className="flex w-full cursor-pointer items-center gap-4 rounded border-b border-black/5 bg-white px-4 py-4 last:border-0"
          onClick={() => {
            handleClick(user.id);
          }}
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
      ))}
    </div>
  );
}

export default SearchResults;
