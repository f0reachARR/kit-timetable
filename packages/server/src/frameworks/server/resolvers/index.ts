import { Resolvers } from '../graphql.generated';
import { syllabusQuery } from './syllabus';

export const resolvers: Resolvers = {
  Query: {
    subjects: syllabusQuery,
  },
};
