import React, { useState } from "react";
import Image from "next/image";
import { getSpeciesIcon, getStatusIcon } from "@/helpers/iconMapper";
import { FaHeartbeat, FaUserAlt } from "react-icons/fa";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const CharacterCard = ({ character, onDelete }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div
      className={`relative bg-green-500 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden h-auto md:h-96 w-full max-w-xs mx-auto ${
        showDetails ? "border-gradient" : ""
      }`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-white mb-4 h-12 flex items-center justify-center">
          {character.name}
        </h2>
        <div className="w-36 h-36 md:w-48 md:h-56 relative mb-4">
          <Image
            src={character?.image || ""}
            alt={character.name}
            fill
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
            style={{ objectFit: "cover" }}
            className={`rounded-lg transition-transform duration-300 ${
              showDetails ? "scale-110" : "scale-100"
            }`}
          />
        </div>
        <div className="flex justify-around w-full mt-auto md:mt-2 text-white">
          <div className="flex flex-col items-center">
            {getSpeciesIcon(character.species)}
            <span className="hidden md:flex">{character.species}</span>
          </div>
          <div className="flex flex-col items-center">
            {getStatusIcon(character.status)}
            <span className="hidden md:flex">{character.status}</span>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-green-700 bg-opacity-90 p-4 rounded-lg flex flex-col justify-center items-center text-white transition-all duration-300 ${
          showDetails ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      >
        <Link
          href={`/character?id=${character?.id}&isCustom=${character.isCustom}`}
        >
          <div className="static w-full h-full">
            <Image
              src={character?.image || ""}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
              className="rounded-lg opacity-50"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 font-rick-and-morty">
              {character.name}
            </h2>
            <p className="mb-2">
              <FaUserAlt className="inline mr-2" />
              Species: {character.species}
            </p>
            <p className="mb-2">
              <FaHeartbeat className="inline mr-2" />
              Status: {character.status}
            </p>
          </div>
        </Link>
        {user && character.isCustom && (
          <button
            onClick={() => onDelete(character.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-white rounded-full p-1 z-20"
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
