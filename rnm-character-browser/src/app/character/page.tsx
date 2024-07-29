"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

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
        episode
        name
      }
    }
  }
`;

const CharacterDetail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });
  console.log("🚀 ~ CharacterDetail ~ data!!", data);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const character = data.character;
  if (!character) return <p>Character Not Found</p>;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-left items-center mb-4">
        <button
          onClick={() => router.back()}
          className="text-green-400 flex items-center space-x-2 hover:text-green-300 mb-10"
        >
          <FaArrowLeft />
          <span>Back to Listing</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <div className="relative w-60 h-60 md:w-80 md:h-80 mb-4 md:mb-0 md:mr-10">
          <Image
            width={320}
            height={320}
            src={character.image}
            alt={character.name}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="bg-green-700 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">{character.name}</h1>
          </div>
          <div className="border-t border-gray-500 mt-4 pt-4">
            <dl className="space-y-4">
              <div className="flex">
                <dt className="font-medium text-gray-300 w-1/3">Status:</dt>
                <dd className="text-gray-100 w-2/3">{character.status}</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-300 w-1/3">Species:</dt>
                <dd className="text-gray-100 w-2/3">{character.species}</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-300 w-1/3">Origin:</dt>
                <dd className="text-gray-100 w-2/3">{character.origin.name}</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-gray-300 w-1/3">Location:</dt>
                <dd className="text-gray-100 w-2/3">
                  {character.location.name}
                </dd>
              </div>
              {character.episode.length > 0 && (
                <div className="flex">
                  <dt className="font-medium text-gray-300 w-1/3">Episodes:</dt>
                  <dd className="text-gray-100 w-2/3">
                    <ul>
                      {character.episode.map((ep: any, index: number) => (
                        <li key={index} className="mb-1">
                          {ep.episode} : {ep.name}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterPage = () => (
  <Suspense fallback={<Loading />}>
    <CharacterDetail />
  </Suspense>
);

export default CharacterPage;
