export const sortAndFilterData = (
  data: any[],
  search: string,
  sortField: string,
  sortOrder: string
) => {
  let sortedResults = [...data];

  // Filter function to show only keywords includes in the search bar
  if (search) {
    sortedResults = sortedResults.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const sortBy = sortField || "id";

  // If the return result is negative, a is sorted before b. Vice versa.
  sortedResults.sort((a, b) => {
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return sortedResults;
};
