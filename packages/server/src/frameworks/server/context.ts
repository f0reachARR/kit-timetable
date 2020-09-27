import { injectable, inject } from 'inversify';
import { IdpController } from '../../interfaces/controller/idp-controller';
import { SyllabusController } from '../../interfaces/controller/syllabus-controller';

export interface GraphQLContext {
  syllabusController: SyllabusController;
  idpController: IdpController;
}

@injectable()
export class GraphQLContextImpl implements GraphQLContext {
  constructor(
    @inject(SyllabusController)
    readonly syllabusController: SyllabusController,
    @inject(IdpController)
    readonly idpController: IdpController,
  ) {}
}
