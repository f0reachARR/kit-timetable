import { either } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

export const StringNumber = new t.Type<number, string, unknown>(
  'StringNumber',
  t.number.is,
  (u, c) =>
    either.chain(t.string.validate(u, c), (s) => {
      const num = Number(s);
      return isNaN(num) ? t.failure(null, c, 'not a number') : t.success(num);
    }),
  (n) => n.toString(),
);
