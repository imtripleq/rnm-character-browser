"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import Image from "next/image";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      origin {
        name
        id
        type
      }
      location {
        name
      }
      episode {
        name
      }
    }
  }
`;

const CharacterDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return;
  <div className="flex min-h-screen items-center justify-center">
    <Loading />
  </div>;
  if (error) return <p>Error: {error.message}</p>;
  const character = data.character;
  if (!character) return <p>Character Not Found</p>;

  return (
    <div className="flex md:flex-row flex-col min-h-screen justify-center p-4">
      <Image
        width={240}
        height={240}
        src={character.image}
        alt={character.name}
        className="rounded-lg mb-4 md:mr-20 md:self-start self-center"
      />
      <div>
        <div className="flex py-3 sm:px-0 justify-center">
          <h1 className="text-base text-4xl font-semibold leading-7 text-gray-300">
            {character.name}
          </h1>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-300">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">
                {character.status}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-300">
                Origin
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">
                {character.origin.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-300">
                Location
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">
                {character.location.name}
              </dd>
            </div>

            {character.episode.length && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-300">
                  Episode
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">
                  <ul>
                    {character.episode.map((ep: any, index: number) => (
                      <li key={index}>{ep.name}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

const CharacterPage = () => (
  <Suspense>
    <CharacterDetail />
  </Suspense>
);

export default CharacterPage;
