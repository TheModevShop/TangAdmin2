import tree from 'state/StateTree';
import {editUser, getUser} from 'api/userApi';
import _ from 'lodash';
import history from 'appHistory';
import {teardownSession} from 'actions/authenticationActions';
import {getMyGym} from 'actions/GymActions';

const userCursor = tree.select(['user']);
const userDetailsCurosr = tree.select(['user', 'details']);

userDetailsCurosr.on('update', async (value) => {
  const locationId = _.get(value, 'data.data.gyms[0].gym');
  if (locationId) {
    await getMyGym(locationId);
    console.log('succes gym fetch')
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


export function setPushNotifications(push) {
  pushNotificationsCursor.set(push);
  tree.commit();
}

export async function setDefaultLocation(data) {
  const defaultLocationArray = defaultLocation.get(data) || [];
  defaultLocationArray.push(data)
  defaultLocation.set(defaultLocationArray);
  tree.commit();
  await editMe({gyms: [defaultLocationArray[0]._id]});
  invalidateAfterGymChange();
}


