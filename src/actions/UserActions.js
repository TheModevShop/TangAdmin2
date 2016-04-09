import tree from 'state/StateTree';
import {editMeApi, getUser, setDefaultGym} from 'api/userApi';
import _ from 'lodash';
import history from 'appHistory';
import {teardownSession} from 'actions/authenticationActions';
import {getMyGym} from 'actions/GymActions';
import {getRoles} from 'actions/RolesActions';
import {resetAllCursors} from 'actions/AppResetActions';

const userCursor = tree.select(['user']);
const myGyms = tree.select(['user', 'myGyms']);
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
    const loc = _.find(_.get(user, 'body.gyms'), {default: true}) || _.get(user, 'body.gyms[0]');
    const locationId = _.get(loc, 'gym');
    await getMyGym(locationId);
    await getRoles();
    if (locationId) {
      await getMyGym(locationId);
      userCursor.set('role', loc.role.name);
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

export async function setDefaultLocation(gymId) {
 let res;
  try {
    await setDefaultGym(gymId);
    resetAllCursors();
    res = await getMe();
    myGyms.set('stale', true);
  } catch (err) {
    alert('There was an error changing gyms');
  }
  return res;
}


