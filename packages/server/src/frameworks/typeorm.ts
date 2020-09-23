import { ConnectionOptionsReader, createConnection } from 'typeorm';

export const connect = async () => {
  const root = process.cwd();
  const optsReader = new ConnectionOptionsReader({ root });

  const config = await optsReader.get('default');

  await createConnection(config);
};
