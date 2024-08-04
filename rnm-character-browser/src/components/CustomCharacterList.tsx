"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import React, { useMemo, useState, useEffect } from "react";
import Loading from "./Loading";
import SearchAndSortBar from "./SearchAndSortBar";
import CharacterListContent from "./CharacterListContent";
import Modal from "./Modal";
import { sortAndFilterData } from "../helpers/sortAndFilter";

export const GET_CUSTOM_CHARACTERS = gql`
  query GetCustomCharacters {
    listCustomCharacters {
      id
      name
      status
      image
      species
      isCustom
    }
  }
`;

export const DELETE_CUSTOM_CHARACTER = gql`
  mutation DeleteCustomCharacter($id: ID!) {
    deleteCharacter(id: $id)
  }
`;

export default function CustomCharacterList() {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { loading, error, data, observable } = useQuery(GET_CUSTOM_CHARACTERS);

  const [deleteCharacter] = useMutation(DELETE_CUSTOM_CHARACTER, {
    update(cache, { data: { deleteCharacter } }) {
      cache.modify({
        fields: {
          listCustomCharacters(existingCharacters = [], { readField }) {
            return existingCharacters.filter(
              (characterRef: any) =>
                readField("id", characterRef) !== deleteCharacter
            );
          },
        },
      });
    },
    onCompleted() {
      setModalMessage("Character deleted successfully!");
      setIsModalOpen(true);
      observable.refetch();
    },
    onError(error) {
      setModalMessage(`Error deleting character: ${error.message}`);
      setIsModalOpen(true);
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteCharacter({ variables: { id } });
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    setSortOrder("asc");
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const sortedData = useMemo(() => {
    if (!data) return [];

    return sortAndFilterData(
      data.listCustomCharacters,
      search,
      sortField,
      sortOrder
    );
  }, [data, sortField, sortOrder, search]);

  useEffect(() => {
    observable.refetch();
  }, [observable]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <SearchAndSortBar
        search={search}
        onSearchChange={handleSearchChange}
        sortField={sortField}
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />
      <CharacterListContent
        sortedData={sortedData}
        pageNum={1}
        totalPages={1}
        handlePageChange={() => {}}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          <h2 className="text-lg font-bold">{modalMessage}</h2>
        </div>
      </Modal>
    </>
  );
}
