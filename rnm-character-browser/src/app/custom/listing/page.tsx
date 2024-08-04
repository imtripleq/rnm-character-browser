import React from "react";
import CustomCharacterList from "@/components/CustomCharacterList";

const CustomCharacterListing = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center mt-10">
        <div className="mt-4 md:mt-10 text-3xl heading-rick-and-morty mb-8">
          Custom Character Listing
        </div>
        <CustomCharacterList />
      </div>
    </div>
  );
};

export default CustomCharacterListing;
