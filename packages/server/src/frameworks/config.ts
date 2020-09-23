import { randomBytes } from 'crypto';
import { config as dotenv } from 'dotenv';
import { injectable } from 'inversify';
import path from 'path';

interface ElasticsearchConfig {
  host: string;
  indexPrefix: string;
}

interface SessionConfig {
  secretKey: string;
}

export interface Config {
  elasticsearch: ElasticsearchConfig;
  session: SessionConfig;
  port: number;
  getElasticsearchIndexFor(name: string): string;
}

@injectable()
export class ConfigImpl implements Config {
  readonly elasticsearch: ElasticsearchConfig;
  readonly session: SessionConfig;
  readonly port: number;
  constructor() {
    dotenv({ path: path.resolve('../../.env') });

    this.elasticsearch = {
      host: process.env.ES_HOST ?? 'http://127.0.0.1:9200',
      indexPrefix: process.env.ES_INDEX_PREFIX ?? 'kittimetable',
    };

    this.session = {
      secretKey:
        process.env.SESSION_SECRET_KEY ?? randomBytes(32).toString('base64'),
    };

    this.port = Number(process.env.PORT ?? 3000);
  }

  getElasticsearchIndexFor(name: string) {
    return `${this.elasticsearch.indexPrefix}_${name}`;
  }
}
