export const TYPES = {
  // Framework
  Elasticsearch: Symbol.for('Elasticsearch'),
  Config: Symbol.for('Config'),
  Server: Symbol.for('Server'),
  GraphQLContext: Symbol.for('GraphQLContext'),
  GraphQLContextFactory: Symbol.for('GraphQLContextFactory'),
  // Gateway
  SyllabusSubjectRepository: Symbol.for('SyllabusSubjectRepository'),
  // Usecase
  FindSyllabusUsecase: Symbol.for('FindSyllabusUsecase'),
  GetSubjectSearchTerms: Symbol.for('GetSubjectSearchTerms'),
  GetSubjectUsecase: Symbol.for('GetSubjectUsecase'),
};
