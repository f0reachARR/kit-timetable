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

interface TwitterAuthConfig {
  consumerKey: string;
  consumerSecret: string;
  callbackUrl: string;
}

export interface Config {
  elasticsearch: ElasticsearchConfig;
  session: SessionConfig;
  twitter: TwitterAuthConfig;
  port: number;
  getElasticsearchIndexFor(name: string): string;
}

@injectable()
export class ConfigImpl implements Config {
  readonly elasticsearch: ElasticsearchConfig;
  readonly session: SessionConfig;
  readonly twitter: TwitterAuthConfig;
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

    this.twitter = {
      consumerKey: process.env.TWITTER_CONSUMER_KEY ?? '',
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET ?? '',
      callbackUrl: process.env.TWITTER_CALLBACK_URL ?? '',
    };

    this.port = Number(process.env.PORT ?? 3000);
  }

  getElasticsearchIndexFor(name: string) {
    return `${this.elasticsearch.indexPrefix}_${name}`;
  }
}
