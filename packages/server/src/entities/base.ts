import { validateOrReject } from 'class-validator';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ExtractProps<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? ExtractProps<T[K]>
    : T[K] extends () => any
    ? never
    : T[K];
};

interface Constructable<T> {
  new (): T;
}

export class EntityBase {
  constructor() {}

  static async from<T>(
    this: Constructable<T>,
    props: ExtractProps<T>,
  ): Promise<T> {
    const entity = new this();

    Object.entries(props).forEach(([key, value]) => {
      // @ts-ignore
      entity[key] = value;
    });

    await validateOrReject(entity);

    return entity;
  }
}
