import { QueryResolvers } from '../graphql.generated';

export const syllabusQuery: QueryResolvers['subjects'] = async (
  _parent,
  { query, from, count },
  { syllabusController },
) => {
  return syllabusController.find(query, from, count);
};
