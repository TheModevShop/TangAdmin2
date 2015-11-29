import tree from 'state/StateTree';
import {editUser, getUser} from 'api/userApi';
import _ from 'lodash';
import {teardownSession} from 'actions/authenticationActions';

const userCursor = tree.select(['user']);

export async function getMe() {
  const user = await getUser();
  if (user) {
    userCursor.set(['details'], user.body);
  } else {
    userCursor.set(['details'], null);
    teardownSession();
  }
  return user;
}

