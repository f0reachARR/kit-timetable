import { NonIdealState } from '@blueprintjs/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import {
  SubjectSearchQuery,
  useFindSubjectQuery,
} from '../../api/graphql.generated';
import { SearchDetailsForm } from '../../components/subject/SearchDetailsForm';
import { SearchSimpleForm } from '../../components/subject/SearchSimpleForm';
import { SubjectListItem } from '../../components/subject/SubjectListItem';

export const SubjectSearch = () => {
  const [query, setQuery] = React.useState<SubjectSearchQuery>({});
  const [debouncedQuery] = useDebounce(query, 500);
  const { refetch, loading, data } = useFindSubjectQuery();

  React.useEffect(() => {
    refetch({
      query: debouncedQuery,
      from: 0,
      count: 20,
    });
  }, [debouncedQuery, refetch]);

  const handleQueryChange = React.useCallback(
    (partialQuery: SubjectSearchQuery) => {
      setQuery((query) => ({
        ...query,
        ...partialQuery,
      }));
    },
    [setQuery],
  );

  return (
    <div className='container max-w-screen-md mx-auto my-3 px-3'>
      <SearchSimpleForm
        query={query}
        isLoading={loading}
        onQueryChange={handleQueryChange}
      />
      <SearchDetailsForm query={query} onQueryChange={handleQueryChange} />
      {!loading &&
        (data?.subjects.total === 0 ? (
          <NonIdealState icon='search' title='No results' />
        ) : (
          <>
            <div>{data?.subjects.total}件</div>
            <ul className='list-none'>
              {data?.subjects.items.map((item) => (
                <li
                  key={item.id}
                  className='border-gray-500 border-b py-2 md:px-1'
                >
                  <Link to={`/subject/${item.id}`} className='text-blue-500'>
                    <SubjectListItem item={item} />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ))}
    </div>
  );
};
