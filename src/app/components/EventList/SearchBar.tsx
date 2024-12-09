import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const SearchBar: FC<SearchBarProps> = ({
  search,
  handleSearch,
  ref: inputRef,
}) => {
  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FontAwesomeIcon
            className="w-[15px] h-[15px] shrink-0 text-slate-gray"
            icon={faSearch}
          />
        </div>
        <input
          ref={inputRef}
          type="search"
          id="default-search"
          className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          onChange={handleSearch}
          value={search}
        />
      </div>
    </div>
  );
};

export default SearchBar;
