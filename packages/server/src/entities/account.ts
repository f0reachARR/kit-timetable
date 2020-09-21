import { EntityBase } from './base';

export class AccountEntity extends EntityBase {
  readonly userId!: string;
  readonly isVerified!: boolean;
  readonly encryptedPassword!: string;
}
