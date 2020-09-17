import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { promises as fs } from 'fs';
import gql from 'graphql-tag';
import { injectable, inject, interfaces } from 'inversify';
import { dirname } from 'path';
import { TYPES } from '../../types';
import { Config } from '../config';
import { GraphQLContext } from './context';
import { resolvers } from './resolvers';

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
      resolvers,
      context: () => this.createContext(),
    });

    apollo.applyMiddleware({ app, path: '/api/graphql' });

    const server = app.listen(this.config.port);

    apollo.installSubscriptionHandlers(server);

    const [indexPath, staticPath] = this.getStaticPath();
    if (staticPath !== null && indexPath !== null) {
      app.use(express.static(staticPath));
      app.use('*', (_req, res) =>
        res.header('Content-Type', 'text/html').sendFile(indexPath),
      );
    }
  }

  private async prepareSchema() {
    const schema = await fs.readFile(
      require.resolve('@f0reacharr/kit-timetable-schema'),
      {
        encoding: 'utf8',
      },
    );

    return gql(schema);
  }

  private getStaticPath() {
    try {
      const indexPath = require.resolve('@f0reacharr/kit-timetable-client');
      const dirPath = dirname(
        require.resolve('@f0reacharr/kit-timetable-client'),
      );

      return [indexPath, dirPath] as const;
    } catch (e) {
      console.error(e);
      return [null, null] as const;
    }
  }
}
