export interface GetSubjectSearchTermsResponse {
  semesters: string[];
  years: number[];
  hours: number[];
}

export interface GetSubjectSearchTermsUsecase {
  run(): Promise<GetSubjectSearchTermsResponse>;
}
