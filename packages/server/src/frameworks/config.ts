import { config as dotenv } from 'dotenv';

interface ElasticsearchConfig {
  host: string;
  indexPrefix: string;
}

export interface Config {
  elasticsearch: ElasticsearchConfig;
  getElasticsearchIndexFor(name: string): string;
}

export class ConfigImpl implements Config {
  readonly elasticsearch: ElasticsearchConfig;
  constructor() {
    dotenv();

    this.elasticsearch = {
      host: process.env.ES_HOST ?? 'http://127.0.0.1:9200',
      indexPrefix: process.env.ES_INDEX_PREFIX ?? 'kittimetable',
    };
  }

  getElasticsearchIndexFor(name: string) {
    return `${this.elasticsearch.indexPrefix}_${name}`;
  }
}
