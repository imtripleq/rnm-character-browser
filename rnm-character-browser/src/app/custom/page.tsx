"use client";
import CreateCharacter from "../../components/CreateCharacter";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

const CustomPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl heading-rick-and-morty mb-8">
          Create Your Own Character
        </h1>
        {!user && (
          <>
            <p className="mb-6 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300 text-center">
              Please sign in or register to create your own custom character in
              the Rick and Morty universe.
            </p>
          </>
        )}
      </div>
      <Authenticator>
        {({ signOut }) => (
          <main className="flex flex-col min-h-screen bg-black text-white">
            <div className="flex flex-col items-center justify-center">
              <>
                <p className="mb-6 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300 text-center">
                  Fill in the details below to create your own custom character
                  in the Rick and Morty universe.
                </p>
                <CreateCharacter />
              </>
            </div>
          </main>
        )}
      </Authenticator>
    </>
  );
};

export default CustomPage;
