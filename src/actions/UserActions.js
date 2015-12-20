import tree from 'state/StateTree';
import {editUser, getUser} from 'api/userApi';
import _ from 'lodash';
import history from 'appHistory';
import {teardownSession} from 'actions/authenticationActions';
import {getMyGym} from 'actions/GymActions';
import {getRoles} from 'actions/RolesActions';

const userCursor = tree.select(['user']);
const userDetailsCurosr = tree.select(['user', 'details']);

const rolesCursor = tree.select(['roles']);

userDetailsCurosr.on('update', async (value) => {
  const location = _.get(value, 'data.data.gyms[0]');
  const locationId = _.get(location, 'gym');
  if (locationId) {
    await getMyGym(locationId);
    userCursor.set('role', _.get(location, 'role.name'));
    tree.commit();
  }
});

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

export async function setDefaultLocation(data) {
  const defaultLocationArray = defaultLocation.get(data) || [];
  defaultLocationArray.push(data)
  defaultLocation.set(defaultLocationArray);
  tree.commit();
  await editMe({gyms: [defaultLocationArray[0]._id]});
  invalidateAfterGymChange();
}


