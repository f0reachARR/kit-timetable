import { config as dotenv } from 'dotenv';
import { injectable } from 'inversify';

interface ElasticsearchConfig {
  host: string;
  indexPrefix: string;
}

export interface Config {
  elasticsearch: ElasticsearchConfig;
  port: number;
  getElasticsearchIndexFor(name: string): string;
}

@injectable()
export class ConfigImpl implements Config {
  readonly elasticsearch: ElasticsearchConfig;
  readonly port: number;
  constructor() {
    dotenv();

    this.elasticsearch = {
      host: process.env.ES_HOST ?? 'http://127.0.0.1:9200',
      indexPrefix: process.env.ES_INDEX_PREFIX ?? 'kittimetable',
    };

    this.port = Number(process.env.PORT ?? 3000);
  }

  getElasticsearchIndexFor(name: string) {
    return `${this.elasticsearch.indexPrefix}_${name}`;
  }
}
