import { isLeft } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import {
  parse as parseQueryString,
  stringify as stringifyQueryString,
} from 'querystring';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { SubjectSearchQuery } from '../api/graphql.generated';
import { StringNumber } from '../utils/io-types';

const searchQueryType = t.partial({
  title: t.union([t.string, t.null]),
  semester: t.union([t.string, t.null]),
  year: t.union([StringNumber, t.null]),
  hour: t.union([StringNumber, t.null]),
  date: t.union([StringNumber, t.null]),
  type: t.union([t.literal('intensive'), t.literal('fixed'), t.null]),
});
export const useSubjectSearchQueryFromQuery = () => {
  const { search: rawQueryString } = useLocation();
  const queryString: unknown = React.useMemo(
    () => parseQueryString(rawQueryString.replace(/^\?/, '')),
    [rawQueryString],
  );

  const createQuery = React.useCallback((query: SubjectSearchQuery) => {
    const reduced = Object.entries(query).reduce(
      (prev, [key, value]) =>
        value !== null
          ? {
              ...prev,
              [key]: value,
            }
          : prev,
      {},
    );
    return stringifyQueryString(searchQueryType.encode(reduced));
  }, []);

  return React.useMemo(() => {
    const decoded = searchQueryType.decode(queryString);

    if (isLeft(decoded)) {
      return [null, decoded.left, createQuery] as const;
    } else {
      return [decoded.right as SubjectSearchQuery, null, createQuery] as const;
    }
  }, [queryString]);
};
