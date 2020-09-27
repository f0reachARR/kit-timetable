import { injectable } from 'inversify';
import { AccountEntity } from '../../entities/account';

@injectable()
export class AccountPresenter {
  run(account: AccountEntity) {
    return account;
  }
}
