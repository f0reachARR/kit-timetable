import { NonIdealState, Spinner } from '@blueprintjs/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, useHistory } from 'react-router-dom';
import {
  SubjectSearchQuery,
  useFindSubjectQuery,
} from '../../api/graphql.generated';
import { SearchDetailsForm } from '../../components/subject/SearchDetailsForm';
import { SearchSimpleForm } from '../../components/subject/SearchSimpleForm';
import { SubjectListItem } from '../../components/subject/SubjectListItem';
import { useSubjectSearchQueryFromQuery } from '../../hooks/subject-search-query';

export const SubjectSearch = () => {
  const [query, queryError, createQuery] = useSubjectSearchQueryFromQuery();
  const history = useHistory();
  const { refetch, loading, data, error, fetchMore } = useFindSubjectQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [scrollRef, inView] = useInView();

  React.useEffect(() => {
    if (query) {
      refetch({
        query,
        from: 0,
        count: 50,
      });
    }
  }, [query, queryError]);

  React.useEffect(() => {
    if (inView && !loading && data && query) {
      const items = data.subjects.items;
      fetchMore({
        variables: {
          query,
          from: items.length,
          count: 50,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev;
          return {
            subjects: {
              total: fetchMoreResult.subjects.total,
              items: [
                ...prev.subjects.items,
                ...fetchMoreResult.subjects.items,
              ],
              __typename: prev.subjects.__typename,
            },
          };
        },
      });
    }
  }, [inView, data, loading]);

  const handleQueryChange = React.useCallback(
    (partialQuery: SubjectSearchQuery) => {
      const newQuery = {
        ...query,
        ...partialQuery,
      };
      history.replace(`/search?${createQuery(newQuery)}`);
    },
    [query],
  );

  const renderSearchResult = React.useCallback(() => {
    if (loading && !data) {
      return (
        <div className='flex justify-center'>
          <Spinner size={Spinner.SIZE_LARGE} />
        </div>
      );
    }

    if (error || !data) {
      return <NonIdealState icon='warning-sign' title='Error occured' />;
    }

    const { total, items } = data.subjects;

    if (total === 0) {
      return <NonIdealState icon='search' title='No results' />;
    }

    const hasMore = total > items.length;
    return (
      <>
        <div>{data.subjects.total}件</div>
        <ul className='list-none'>
          {data.subjects.items.map((item) => (
            <li key={item.id} className='border-gray-500 border-b'>
              <Link to={`/subject/${item.id}`} className='text-blue-500'>
                <SubjectListItem item={item} />
              </Link>
            </li>
          ))}
          {hasMore && <li ref={scrollRef} />}
        </ul>
        {loading && (
          <div className='flex justify-center'>
            <Spinner size={Spinner.SIZE_LARGE} />
          </div>
        )}
      </>
    );
  }, [loading, data, error]);

  return (
    <div className='container max-w-screen-md mx-auto my-3 px-3'>
      {query ? (
        <>
          <SearchSimpleForm
            query={query}
            isLoading={loading}
            onQueryChange={handleQueryChange}
          />
          <SearchDetailsForm query={query} onQueryChange={handleQueryChange} />
          {renderSearchResult()}
        </>
      ) : (
        <NonIdealState icon='warning-sign' title='Error occured' />
      )}
    </div>
  );
};
