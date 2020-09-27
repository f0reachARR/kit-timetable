import { MutationResolvers } from '../graphql.generated';

export const startIdpLoginMutation: MutationResolvers['startIdpLogin'] = async (
  _parent,
  { type },
  { idpController },
) => {
  return idpController.startIdpLogin(type);
};
