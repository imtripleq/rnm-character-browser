"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Image from "next/image";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        status
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

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

    // If the return result is negative, a is sorted before b. Vice versa.
    if (sortField) {
      sortedResults.sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortedResults;
  }, [data, sortField, sortOrder, search]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex w-max justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="border p-2 rounded text-gray-900"
        />
        <form className="flex">
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            id="underline_select"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
            <option value="species">Species</option>
          </select>
          {sortField !== "" && (
            <button
              type="button"
              onClick={handleSortOrder}
              className="bg-gray-50 border border-gray-300 text-gray-900 hover:text-blue-700 hover:bg-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {sortOrder}
            </button>
          )}
        </form>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {sortedData.map((character: any) => (
          <Link key={character.id} href={`/character?id=${character.id}`}>
            <li className="flex justify-between md:gap-x-96 py-5">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  width={96}
                  height={96}
                  loading="lazy"
                  alt={`Avatar image for ${character.name}`}
                  src={character.image}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-200">
                    {character.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-100">
                    {character.species}
                  </p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-300">
                  {character.role}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-200">
                  Status {character.status}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <Pagination
        currentPage={pageNum}
        totalPages={data?.characters.info.pages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
