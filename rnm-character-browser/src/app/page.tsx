export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
          {`Dennis' Demo`}
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300 text-center">
          Explore and Discover Characters from the Rick and Morty Universe.
          Easily browse through detailed character profiles, including their
          status, species, and origins, with seamless pagination and dynamic
          data fetching. Powered by Apollo GraphQL and Next.js.
        </p>
      </div>
      <div className="flex flex-col mt-10">
        <a
          href="/listing/1"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Get Started
          </span>
        </a>
      </div>
    </main>
  );
}
