"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import React, { useMemo, useState } from "react";
import Loading from "./Loading";
import SearchAndSortBar from "./SearchAndSortBar";
import CharacterListContent from "./CharacterListContent";
import { sortAndFilterData } from "../helpers/sortAndFilter";
import { GET_CHARACTERS } from "@/lib/queries";

export default function CharacterList() {
  const router = useRouter();
  const { page } = useParams<{ page: string }>();
  const pageNum = parseInt(page, 10) || 1;

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: pageNum },
  });
  console.log("🚀 ~ CharacterList ~ data!!", data);

  const handlePageChange = (newPage: number) => {
    if (data.characters.info.next) {
      router.push(`/listing/${newPage}`);
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
      data.characters.results,
      search,
      sortField,
      sortOrder
    );
  }, [data, sortField, sortOrder, search]);

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
        pageNum={pageNum}
        totalPages={data?.characters.info.pages || 1}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
