import { useState } from "react";
import { BiCaretDown, BiCheck, BiSearch } from "react-icons/bi";

const Dropdown = ({ toggle, sortBy, onSetSortBy, orderBy, onSetOrderBy }) => {
  if (!toggle) {
    return null;
  }
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
        rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          onClick={() => onSetSortBy("petName")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Pet Name {(sortBy === "petName") && <BiCheck />}
        </div>
        <div
          onClick={() => onSetSortBy("ownerName")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Owner Name {(sortBy === "ownerName") && <BiCheck />}
        </div>
        <div
          onClick={() => onSetSortBy("aptDate")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Date {(sortBy === "aptDate") && <BiCheck />}
        </div>
        <div
          onClick={() => onSetOrderBy("asc")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem"
        >
          Asc {(orderBy === "asc") && <BiCheck />}
        </div>
        <div
          onClick={() => onSetOrderBy("des")}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
        >
          Desc {(orderBy === "des") && <BiCheck />}
        </div>
      </div>
    </div>
  );
};

const Search = ({
  query,
  onQueryChange,
  sortBy,
  onSetSortBy,
  orderBy,
  onSetOrderBy,
}) => {
  let [toggleSort, setToggleSort] = useState(false);
  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          onChange={(event) => onQueryChange(event.target.value)}
          value={query}
          type="text"
          name="query"
          id="query"
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              onClick={() => setToggleSort(!toggleSort)}
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <Dropdown
              toggle={toggleSort}
              sortBy={sortBy}
              onSetSortBy={onSetSortBy}
              orderBy={orderBy}
              onSetOrderBy={onSetOrderBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
