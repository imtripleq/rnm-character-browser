"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import Pagination from "./Pagination";
import Loading from "./Loading";
import CharacterCard from "../components/CharacterCard";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        image
        species
      }
      info {
        pages
        next
        prev
      }
    }
  }
`;

export default function CharacterList() {
  const router = useRouter();
  const { page } = useParams<{ page: string }>();
  const pageNum = parseInt(page, 10) || 1;

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // OPTIONAL: We can use this method if we don't want current page number on the URL parameter
  // const [statePage, setStatePage] = useState(pageNum);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: pageNum },
  });

  const handlePageChange = (newPage: Number) => {
    if (data.characters.info.next) {
      // setStatePage(statePage + 1) // OPTIONAL
      router.push(`/listing/${newPage}`);
    }
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    setSortOrder("asc");
  };

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /*
 This sort function only works for current state Characters,
 If we want to sort whole list we would need to implement sort query
 */
  const sortedData = useMemo(() => {
    if (!data) return [];

    let sortedResults = [...data.characters.results];

    // Filter function to show only keywords includes in the search bar
    if (search) {
      sortedResults = sortedResults.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const sortBy = sortField || "id";

    // If the return result is negative, a is sorted before b. Vice versa.
    sortedResults.sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sortedResults;
  }, [data, sortField, sortOrder, search]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 text-white min-h-screen">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border p-2 rounded text-gray-900 bg-green-200 focus:ring-2 focus:ring-green-400 focus:border-green-300"
        />
        <form className="flex items-center">
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            id="underline_select"
            className="ml-2 bg-green-200 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-300 p-2.5 hover:bg-green-300"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="species">Species</option>
          </select>
          <div className="flex items-center ml-2">
            <label className="flex items-center mr-2">
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={() => handleSortOrder("asc")}
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
                onChange={() => handleSortOrder("desc")}
                className="mr-1"
              />
              Down
            </label>
          </div>
        </form>
      </div>
      {sortedData.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedData.map((character) => (
            <Link key={character.id} href={`/character?id=${character.id}`}>
              <CharacterCard character={character} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-white mt-8">No characters found.</div>
      )}
      <div className="mt-6">
        <Pagination
          currentPage={pageNum}
          totalPages={data?.characters.info.pages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
