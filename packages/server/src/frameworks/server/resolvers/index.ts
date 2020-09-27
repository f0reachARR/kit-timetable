import { Resolvers } from '../graphql.generated';
import { startIdpLoginMutation, finishIdpLoginMutation } from './idp';
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
  Mutation: {
    startIdpLogin: startIdpLoginMutation,
    finishIdpLogin: finishIdpLoginMutation,
  },
};
