import { Client } from '@elastic/elasticsearch';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { Config } from './config';

export interface ElasticsearchConnection {
  client: Client;
  ping(): Promise<void>;
}

export class ElasticsearchConnectionImpl implements ElasticsearchConnection {
  client: Client;

  constructor(
    @inject(TYPES.Config)
    config: Config,
  ) {
    this.client = new Client({
      node: config.elasticsearch.host,
    });
  }

  async ping() {
    const result = await this.client.ping();
    if (result.statusCode !== 200) {
      throw new Error('failed to connect elasticsearch');
    }
  }
}

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
