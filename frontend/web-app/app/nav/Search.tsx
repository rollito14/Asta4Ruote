/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useParamsStore } from "@/app/hooks/useParamsStore";

const Search = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const searchValue = useParamsStore((state) => state.searchValue);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const onInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const search = () => {
    setParams({ searchTerm: searchValue });
  };
  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        onKeyDown={(e: any) => {
          if (e.key === "Enter") search();
        }}
        onChange={onInputChange}
        type="text"
        placeholder="search for cars by make, model and year"
        className="
        flex-grow pl-5 bg-transparent
         border-none
         focus:outline-none
         focus:border-transparent
         focus:ring-0
         text-sm text-gray-600"
        value={searchValue}
      />
      <button onClick={search}>
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
};

export default Search;
