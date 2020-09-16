import { QueryResolvers } from '../graphql.generated';

export const syllabusQuery: QueryResolvers['subjects'] = async (
  _parent,
  { query, from, count },
  { syllabusController },
) => {
  return syllabusController.find(query, from, count);
};

export const subjectSearchTermsQuery: QueryResolvers['subjectSearchTerms'] = async (
  _parent,
  _params,
  { syllabusController },
) => {
  return syllabusController.getTerms();
};
