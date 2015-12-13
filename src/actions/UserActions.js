import tree from 'state/StateTree';
import {editUser, getUser} from 'api/userApi';
import _ from 'lodash';
import history from 'appHistory';
import {teardownSession} from 'actions/authenticationActions';

const userCursor = tree.select(['user']);

export async function editMe(data) {
  try {
    await editUser(data);
    await getMe();
  } catch (err) {
    return err
  }
}

export async function getMe() {
  const user = await getUser();
  if (user.body._id) {
    userCursor.set(['details'], user.body);
    tree.commit();
    return user.body;
  } else {
    userCursor.set(['details'], null);
    teardownSession();
    history.pushState(null, '/login');
  }
  return user;
}


