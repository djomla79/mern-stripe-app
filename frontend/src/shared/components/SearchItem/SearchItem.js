const SearchItem = ({ onSearchChange, className, ...rest }) => {
  return (
    <input
      {...rest}
      type='search'
      className={`search-box ${className && className}`}
      onChange={onSearchChange}
    />
  );
};

export default SearchItem;

/**
 *
 * SearchItem usage example
 *
 * const places = [{ id: 1, title: 'title1' }]
 *
 * const filterList = (value) => {
     const filtered = places.filter((item) =>
       item.title.toLocaleLowerCase().includes(value)
     );
     return filtered || places;
   };
   const { filteredList, onSearchHandler } = useSearch(filterList);
 *
 * <SearchItem
     placeholder='Search Places'
     onSearchChange={onSearchHandler}
   />
 */
