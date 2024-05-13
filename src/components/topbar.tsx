import { SearchBox } from "react-instantsearch";
import ToggleViewBtn from "./toggleViewBtn";
import "./topbar.css";
import SearchResults from "./mapSearchResults";

function Topbar() {
  return (
    <header className="pointer-events-none fixed left-0 right-0 top-8 z-10 h-fit w-full px-4 md:px-10">
      <div className="group flex justify-between">
        <div className="group relative w-fit">
          <SearchBox
            placeholder="Search"
            className="pointer-events-auto flex px-4"
          />
          <SearchResults />
        </div>
        <ToggleViewBtn />
      </div>
    </header>
  );
}
export default Topbar;
