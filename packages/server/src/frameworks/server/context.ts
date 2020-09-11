import { injectable, inject } from 'inversify';
import { SyllabusController } from '../../controller/syllabus-controller';

export interface GraphQLContext {
  syllabusController: SyllabusController;
}

@injectable()
export class GraphQLContextImpl implements GraphQLContext {
  constructor(
    @inject(SyllabusController)
    readonly syllabusController: SyllabusController,
  ) {}
}
