import { TUser } from "@/context/mapContext";
import L from "leaflet";

function PopupHTML(user: TUser): L.Popup {
  return L.popup({
    className: "",
    content: `
                <div class="flex gap-8 items-center h-fit">
                  <div class="w-16 h-16 overflow-hidden rounded-full border">
                      <img src=${user.photo} alt=${user.fullName} class="w-full h-full object-cover"></img>
                  </div>
                  <div class="flex flex-col gap-0 max-h-fit space-y-2">
                      <span class="whitespace-nowrap text-lg">${user.fullName}</span>
                      <span class="whitespace-nowrap opacity-80">${user.companyName ? user.companyName + (user.designation ? ", " + user.designation : null) : null}</span>
                      <span class="whitespace-nowrap text-sm opacity-60 p-0">${user.location.city ? (user.location.city + ", " + user.location.state ? (user.location.state + ", " + user.location.country ? user.location.country : null) : null) : null}</span>
                  </div>
                </div>
                `,
    autoClose: true,
  }).setLatLng([user.location.lat!, user.location.lng!]);
}
export default PopupHTML;
