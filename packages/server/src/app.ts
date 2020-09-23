#!/usr/bin/env node

import 'reflect-metadata';

import { Client } from '@elastic/elasticsearch';
import { Container, decorate, injectable } from 'inversify';
import { Config } from './frameworks/config';
import {
  gatewayContainer,
  interfaceContainer,
  frameworkContainer,
  usecaseContainer,
} from './frameworks/containers';
import { createElasticsearchClient } from './frameworks/elasticsearch';
import { Server } from './frameworks/server';
import { connect as connectOrm } from './frameworks/typeorm';
import { TYPES } from './types';

(async () => {
  decorate(injectable(), Client);

  const container = new Container({ skipBaseClassChecks: true });
  container.load(
    gatewayContainer,
    interfaceContainer,
    frameworkContainer,
    usecaseContainer,
  );

  const config = container.get<Config>(TYPES.Config);
  const esClient = await createElasticsearchClient(config);

  container.bind<Client>(TYPES.Elasticsearch).toConstantValue(esClient);

  await connectOrm();

  await container.get<Server>(TYPES.Server).start();
})();
