import { Resolvers } from '../graphql.generated';
import {
  syllabusQuery,
  subjectSearchTermsQuery,
  subjectQuery,
} from './syllabus';

export const resolvers: Resolvers = {
  Query: {
    subjects: syllabusQuery,
    subjectSearchTerms: subjectSearchTermsQuery,
    subject: subjectQuery,
  },
};
