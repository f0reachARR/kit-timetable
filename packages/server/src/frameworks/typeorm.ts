import { resolve } from 'path';
import { ConnectionOptionsReader, createConnection } from 'typeorm';

const getRoot = () => {
  if (require.main) {
    // require.main.path is directory name, not full path
    return resolve(require.main.path, '../');
  }

  return process.cwd();
};

export const connect = async () => {
  const root = getRoot();

  const optsReader = new ConnectionOptionsReader({ root });

  const config = await optsReader.get('default');

  await createConnection(config);
};
