"use client";
import * as React from "react";

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchField: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <div className="w-full">
      <input
        className="h-12 block max-w-lg mx-auto w-full px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:none focus:shadow-lg shadow-md transition-shadow"
        type="search"
        value={query}
        placeholder="Hva vil du spørre partiene om?"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
