import React from "react";
import Image from "next/image";
import CharacterList from "@/components/CharacterList";
import rickAndMortyLogo from "/public/logo.png";
import Link from "next/link";

export default function Listing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center mt-10">
        <Link href={"/"}>
          <div className="relative w-64 h-24 mb-8">
            <Image
              src={rickAndMortyLogo}
              alt="Rick and Morty Logo"
              fill
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
              style={{ objectFit: "contain" }}
              priority
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
