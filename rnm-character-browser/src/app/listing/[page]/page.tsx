import React from "react";
import Image from "next/image";
import CharacterList from "@/components/CharacterList";
import rickAndMortyLogo from "/public/logo.png";
import Link from "next/link";

export default function Listing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col mt-10 items-center">
        <Link href={"/"}>
          <div className="relative w-96 h-32 mb-8">
            <Image
              src={rickAndMortyLogo}
              alt="Rick and Morty Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
        <h2 className="text-3xl heading-rick-and-morty mb-8">
          Character Listing
        </h2>
        <CharacterList />
      </div>
    </div>
  );
}
