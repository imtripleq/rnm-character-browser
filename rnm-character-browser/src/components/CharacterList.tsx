"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Image from "next/image";

const GET_CHARACTERS = gql`
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

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {data?.characters.results.map((character: any) => (
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
