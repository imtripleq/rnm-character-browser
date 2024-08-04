import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";

interface CharacterListContentProps {
  sortedData: any[];
  pageNum: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  onDelete?: (id: string) => void;
}

const CharacterListContent: React.FC<CharacterListContentProps> = ({
  sortedData,
  pageNum,
  totalPages,
  handlePageChange,
  onDelete,
}) => (
  <div className="container mx-auto px-4 py-8 text-white min-h-screen w-full">
    {sortedData.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedData.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onDelete={onDelete}
          />
        ))}
      </div>
    ) : (
      <div className="text-center text-white mt-8">No characters found.</div>
    )}
    <div className="mt-6">
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  </div>
);

export default CharacterListContent;
