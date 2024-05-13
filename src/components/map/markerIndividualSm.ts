import { TUser } from "@/context/mapContext";
import L from "leaflet";

function MarkerIndividualSm(user: TUser): L.DivIcon {
  const html = L.divIcon({
    html: ` 
    <div class="flex gap-4 rounded-full w-fit p-2 bg-white items-center relative">
        <div class="rounded-full overflow-hidden border w-8 h-8">
            <img src=${user.photo} alt=${user.fullName} width="16" height="16" class="h-full w-full object-cover"></img>
        </div>
        <span class="rotate-45 -bottom-1 mx-auto left-0 right-0 absolute w-4 h-4 bg-white -z-10"></span>
    </div>`,
    className: "",
  });
  return html;
  //           <div class="rounded-full overflow-hidden border w-8 h-8">
}

export default MarkerIndividualSm;
