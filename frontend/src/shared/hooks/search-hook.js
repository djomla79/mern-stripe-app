import { useState } from 'react';

const useSearch = (filterList) => {
  const [filteredList, setFilteredList] = useState(filterList());

  const onSearchHandler = (event) => {
    setFilteredList(filterList(event.target.value));
  };

  return { filteredList, onSearchHandler };
};

export default useSearch;
