import { Client } from '@elastic/elasticsearch';
import { injectable, inject } from 'inversify';
import { SyllabusSubjectEntity } from '../../entities/syllabus-subject';
import { Config } from '../../frameworks/config';
import {
  GetResponse,
  SearchResponse,
  ElasticsearchConnection,
} from '../../frameworks/elasticsearch';
import {
  SyllabusSubjectRepository,
  SyllabusSubjectRepositoryFindRequest,
  SyllabusSubjectRepositoryQuery,
} from '../../repositories/syllabus-subject';
import { TYPES } from '../../types';

@injectable()
export class SyllabusSubjectGateway implements SyllabusSubjectRepository {
  private readonly indexName: string;
  private readonly elasticsearch: Client;
  constructor(
    @inject(TYPES.Elasticsearch)
    readonly connection: ElasticsearchConnection,
    @inject(TYPES.Config)
    readonly config: Config,
  ) {
    this.indexName = config.getElasticsearchIndexFor('subjects');
    this.elasticsearch = connection.client;
  }

  async init() {}

  async get(id: number) {
    const result = await this.elasticsearch.get<
      GetResponse<SyllabusSubjectEntity>
    >({
      id: `${id}`,
      index: this.indexName,
    });

    return result.body.found
      ? SyllabusSubjectEntity.from(result.body._source)
      : null;
  }

  private createQuery(query: SyllabusSubjectRepositoryQuery) {
    const must: unknown[] = [];

    if (typeof query.available === 'boolean') {
      must.push({
        term: {
          'categories.available': { value: query.available },
        },
      });
    }

    if (query.type === 'intensive') {
      must.push({
        terms: {
          'categories.schedule.type': ['intensive'],
        },
      });
    }

    if (query.type === 'fixed') {
      must.push({
        terms: {
          'categories.schedule.type': ['fixed'],
        },
      });
    }

    if (typeof query.date === 'number') {
      must.push({
        terms: {
          'categories.schedule.days.date': [query.date],
        },
      });
    }

    if (typeof query.hour === 'number') {
      must.push({
        terms: {
          'categories.schedule.days.hour': [query.hour],
        },
      });
    }

    if (typeof query.year === 'number') {
      must.push({
        terms: {
          'categories.schedule.year': [query.year],
        },
      });
    }

    if (typeof query.semester === 'string') {
      must.push({
        terms: {
          'categories.schedule.semester': [query.semester],
        },
      });
    }

    if (query.flags) {
      must.push({
        terms: {
          flags: query.flags,
        },
      });
    }

    if (typeof query.title === 'string' && query.title.length > 0) {
      must.push({
        simple_query_string: {
          query: query.title,
          fields: ['title'],
          default_operator: 'and',
        },
      });
    }

    return {
      bool: {
        must,
      },
    };
  }

  async find(request: SyllabusSubjectRepositoryFindRequest) {
    const query = this.createQuery(request.query);
    const result = await this.elasticsearch.search<
      SearchResponse<SyllabusSubjectEntity>
    >({
      index: this.indexName,
      body: {
        query,
        from: request.from,
        size: request.count,
      },
    });

    return {
      totalCount: result.body.hits.total.value,
      items: result.body.hits.hits.map((item) =>
        SyllabusSubjectEntity.from(item._source),
      ),
    };
  }
}
