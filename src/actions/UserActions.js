import tree from 'state/StateTree';
import {editMeApi, getUser} from 'api/userApi';
import _ from 'lodash';
import history from 'appHistory';
import {teardownSession} from 'actions/authenticationActions';
import {getMyGym} from 'actions/GymActions';
import {getRoles} from 'actions/RolesActions';

const userCursor = tree.select(['user']);
const userDetailsCurosr = tree.select(['user', 'details']);

userDetailsCurosr.on('update', async (value) => {
  // const location = _.get(value, 'data.data.gyms[0]');
  // const locationId = _.get(location, 'gym');
  // if (locationId) {
  //   await getMyGym(locationId);
  //   userCursor.set('role', location.role.name);
  //   tree.commit();
  // }
});

export async function editMe(data) {
  try {
    await editMeApi(data);
    await getMe();
  } catch (err) {
    return err
  }
}

export async function getMe() {
  try {
    const user = await getUser();
    const location = _.find(_.get(user, 'body.gyms'), {default: true}) || _.get(user, 'body.gyms[0]');
    const locationId = _.get(location, 'gym');
    await getMyGym(locationId);
    await getRoles();
    if (locationId) {
      await getMyGym(locationId);
      userCursor.set('role', location.role.name);
      tree.commit();
    }

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
  } catch(err) {
    teardownSession();
    history.pushState(null, '/login');
  }
}

export async function setDefaultLocation(data) {
  const defaultLocationArray = defaultLocation.get(data) || [];
  defaultLocationArray.push(data)
  defaultLocation.set(defaultLocationArray);
  tree.commit();
  await editMe({gyms: [defaultLocationArray[0]._id]});
  invalidateAfterGymChange();
}


