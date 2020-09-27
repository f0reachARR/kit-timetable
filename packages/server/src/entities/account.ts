import { IsUUID, IsBoolean } from 'class-validator';
import { EntityBase } from './base';
export class AccountEntity extends EntityBase {
  @IsUUID()
  readonly userId!: string;

  @IsBoolean()
  readonly isVerified!: boolean;
}
