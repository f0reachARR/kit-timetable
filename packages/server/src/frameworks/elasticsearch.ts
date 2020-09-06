import { Client } from '@elastic/elasticsearch';
import { Config } from './config';

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

export const createElasticsearchClient = async (config: Config) => {
  const client = new Client({
    node: config.elasticsearch.host,
  });

  const { statusCode } = await client.ping();

  if (statusCode !== 200) {
    throw new Error('elasticsearch connection error');
  }

  return client;
};
