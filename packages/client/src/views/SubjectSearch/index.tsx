import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  useFindSubjectLazyQuery,
  SubjectSearchQuery,
} from '../../api/graphql.generated';
import { SearchSimpleForm } from '../../components/subject/SearchSimpleForm';

export const SubjectSearch = () => {
  const [query, setQuery] = React.useState<SubjectSearchQuery>({});
  const [dispatchSearch, { called, loading }] = useFindSubjectLazyQuery();

  const [debouncedSearch] = useDebouncedCallback(
    (query: SubjectSearchQuery) => {
      dispatchSearch({
        variables: {
          query,
          from: 0,
          count: 20,
        },
      });
    },
    500,
  );

  const handleQueryChange = React.useCallback(
    (newQuery: SubjectSearchQuery) => {
      setQuery(newQuery);
      debouncedSearch(newQuery);
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
      {called && <div>nyaa</div>}
    </div>
  );
};
