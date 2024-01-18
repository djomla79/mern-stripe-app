import { Fragment, useState } from 'react';

export const withSearch =
  (WrappedComponent, list, className, ...rest) =>
  () => {
    const [filteredList, setFilteredList] = useState(list || []);

    const onSearchHandler = (searchInput) => {
      const filtered = list.filter((item) =>
        item.title.toLocaleLowerCase().includes(searchInput)
      );
      setFilteredList(filtered);
    };

    return (
      <Fragment>
        <input
          {...rest}
          type='search'
          className={`search-box ${className}`}
          onChange={(event) => {
            onSearchHandler(event.target.value.toLocaleLowerCase());
          }}
        />
        <WrappedComponent items={filteredList} />
      </Fragment>
    );
  };

export default withSearch;

/**
 *
 * search items using HOC example
 *
 * const PlaceListWithSearch = withSearch(PlaceList, places);
 *
 * <PlaceListWithSearch />
 *
 */
