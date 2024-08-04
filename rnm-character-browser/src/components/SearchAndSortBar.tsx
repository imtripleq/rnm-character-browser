import React from "react";

interface SearchAndSortBarProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortField: string;
  onSortChange: (field: string) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
}

const SearchAndSortBar: React.FC<SearchAndSortBarProps> = ({
  search,
  onSearchChange,
  sortField,
  onSortChange,
  sortOrder,
  onSortOrderChange,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={onSearchChange}
      className="border p-2 rounded text-gray-900 bg-green-200 focus:ring-2 focus:ring-green-400 focus:border-green-300 h-10 w-full md:w-auto"
    />
    <form className="flex items-center">
      <select
        onChange={(e) => onSortChange(e.target.value)}
        id="underline_select"
        className="md:ml-2 mr-4 my-4 bg-green-200 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-300 p-2.5 hover:bg-green-300"
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="status">Status</option>
        <option value="species">Species</option>
      </select>
      <div className="flex items-center md:ml-2">
        <label className="flex items-center mr-2">
          <input
            type="radio"
            name="sortOrder"
            value="asc"
            checked={sortOrder === "asc"}
            onChange={() => onSortOrderChange("asc")}
            className="mr-1"
          />
          Up
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="sortOrder"
            value="desc"
            checked={sortOrder === "desc"}
            onChange={() => onSortOrderChange("desc")}
            className="mr-1"
          />
          Down
        </label>
      </div>
    </form>
  </div>
);

export default SearchAndSortBar;
