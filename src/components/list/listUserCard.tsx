import { TUser } from "@/context/mapContext";
import useMapContext from "@/hooks/useMapContext";
import Image from "next/image";

function ListUserCard({
  user,
  showUserDetails,
}: {
  user: TUser;
  showUserDetails: (id: number) => void;
}) {
  const {
    id,
    email,
    photo,
    gender,
    fullName,
    location,
    companyName,
    designation,
  } = user;
  const { selUser } = useMapContext();
  return (
    <div className="flex flex-col rounded border px-4 py-4">
      <div className="flex items-center gap-8">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          {photo ? (
            <Image src={photo} alt={fullName} width={64} height={64} />
          ) : (
            <div>User Photo</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg">{fullName}</span>
          <span className="opacity-80">
            {companyName ? companyName + ", " : null}
            {designation ? designation : null}
          </span>
        </div>
      </div>
      <div className="h-fit px-8">
        {selUser === id ? (
          <div className="flex justify-between py-8">
            {email && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Email</span>
                <span className="opacity-90">{email}</span>
              </div>
            )}
            {gender && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Gender</span>
                <span className="opacity-90">{gender}</span>
              </div>
            )}
            {(location.city || location.state || location.country) && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Location</span>
                <span className="opacity-90">
                  {location.city
                    ? location.city + ", " + location.state
                      ? location.state + ", " + location.country
                        ? location.country
                        : null
                      : null
                    : null}
                </span>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="flex justify-end">
        <button onClick={() => showUserDetails(id)}>
          {selUser === id ? (
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
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          ) : (
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
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default ListUserCard;
