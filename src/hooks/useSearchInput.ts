export const useSearchInput = (array: string[], keyword: string) => {
  const filterArray = array.filter((element) =>
    element
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase().replace(' ', '')),
  );
  return filterArray;
};
