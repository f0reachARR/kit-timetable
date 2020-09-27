import { MutationResolvers } from '../graphql.generated';

export const startIdpLoginMutation: MutationResolvers['startIdpLogin'] = async (
  _parent,
  { type },
  { idpController },
) => {
  return idpController.startIdpLogin(type);
};

export const finishIdpLoginMutation: MutationResolvers['finishIdpLogin'] = async (
  _parent,
  { response },
  { idpController },
) => {
  return idpController.finishIdpLogin(response);
};
