export type GetResponse<TSource> =
  | { found: false }
  | {
      found: true;
      _source: TSource;
    };

export interface SearchResponse<TSource> {
  took: number;
  timed_out: boolean;
  hits: {
    total: {
      value: number;
      relation: 'eq' | 'gte';
    };
    max_score: number;
    hits: Array<{
      _id: string;
      _score?: number;
      _source: TSource;
    }>;
  };
}
