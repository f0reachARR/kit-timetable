import { Resolvers } from '../graphql.generated';
import { syllabusQuery, subjectSearchTermsQuery } from './syllabus';

export const resolvers: Resolvers = {
  Query: {
    subjects: syllabusQuery,
    subjectSearchTerms: subjectSearchTermsQuery,
  },
};
