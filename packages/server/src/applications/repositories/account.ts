import { AccountEntity } from '../../entities/account';

export interface AccountRepository {
  create(): Promise<AccountEntity>;
  update(entity: AccountEntity): Promise<AccountEntity>;
  get(id: string): Promise<AccountEntity | null>;
}
