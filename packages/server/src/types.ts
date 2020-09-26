export const TYPES = {
  // Framework
  Elasticsearch: Symbol.for('Elasticsearch'),
  Config: Symbol.for('Config'),
  Server: Symbol.for('Server'),
  GraphQLContext: Symbol.for('GraphQLContext'),
  GraphQLContextFactory: Symbol.for('GraphQLContextFactory'),
  // Gateway
  SyllabusSubjectRepository: Symbol.for('SyllabusSubjectRepository'),
  AccountRepository: Symbol.for('AccountRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  IdProviderRepositories: Symbol.for('IdProviderRepositories'),
  // Usecase
  FindSyllabusUsecase: Symbol.for('FindSyllabusUsecase'),
  GetSubjectSearchTerms: Symbol.for('GetSubjectSearchTerms'),
  GetSubjectUsecase: Symbol.for('GetSubjectUsecase'),
  StartIdpLoginUsecase: Symbol.for('StartIdpLoginUsecase'),
  IdpLoginUsecase: Symbol.for('IdpLoginUsecase'),
};
