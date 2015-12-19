import tree from 'state/StateTree';
import _ from 'lodash';
import {getRolesRequest} from 'api/rolesApi';

const rolesCursor = tree.select(['roles']);

export async function getRoles(data) {
  try {
    const roles = await getRolesRequest(data);
    rolesCursor.set(roles.body)
    return roles.body;
  } catch (err) {
    rolesCursor.set({error: true});
    return err
  }
}
