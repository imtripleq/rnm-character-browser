import CharacterList from "@/components/CharacterList";

export default function Listing() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col mt-10">
        <h1 className="text-3xl font-bold mb-8">Rick and Morty Characters</h1>
        <CharacterList />
      </div>
    </div>
  );
}
