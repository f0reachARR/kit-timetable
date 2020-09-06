import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { promises as fs } from 'fs';
import gql from 'graphql-tag';
import { injectable, inject, interfaces } from 'inversify';
import { TYPES } from '../../types';
import { Config } from '../config';
import { GraphQLContext } from './context';

export interface Server {
  start(): Promise<void>;
}

@injectable()
export class ServerImpl implements Server {
  constructor(
    @inject(TYPES.Config)
    readonly config: Config,
    @inject(TYPES.GraphQLContextFactory)
    readonly createContext: interfaces.Factory<GraphQLContext>,
  ) {}

  async start() {
    const typeDefs = await this.prepareSchema();

    const app = express();
    const apollo = new ApolloServer({
      typeDefs,
      context: () => this.createContext(),
    });

    apollo.applyMiddleware({ app, path: '/api/graphql' });

    const server = app.listen(this.config.port);

    apollo.installSubscriptionHandlers(server);
  }

  private async prepareSchema() {
    const schema = await fs.readFile(require.resolve('kit-timetable-schema'), {
      encoding: 'utf8',
    });

    return gql(schema);
  }
}
