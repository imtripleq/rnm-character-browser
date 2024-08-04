"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";
import SignIn from "../../components/SignIn";

const SignInPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();

  // Redirect user to homepage if signed in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-3xl heading-rick-and-morty mb-8">Sign In</h1>

        <>
          <p className="mb-6 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300 text-center">
            Please sign in or register to create your own custom character in
            the Rick and Morty universe.
          </p>
        </>
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
