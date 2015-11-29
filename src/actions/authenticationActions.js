import tree from 'state/StateTree';
import bluebird from 'bluebird';
import history from 'appHistory';
import {fetchToken} from 'api/authApi';
import {getMe} from 'actions/userActions';
const authentication = tree.select(['authentication']);
const userCursor = tree.select(['user']);

const preferences = tree.select(['preferences']);
const account = tree.select(['account']);

checkSession();

export async function getAuthentication(data) {
  const {email, password} = data;
  try {
    const token = await fetchToken({email, password});
    buildSession(token.body.token);
    return token;
  } catch (e) {
    authentication.set('error', e);
    return false;
  }
}

export async function checkSession() {
  const user = await getMe();
  if (user) {
    userCursor.set(user);
    return user;
  } else {
    // go to login
    teardownSession();
    history.pushState(null, '/login');
    return false;
  }
}

async function buildSession(session) {
  authentication.set({sessionData: session});
  localStorage.setItem('sessionData', session);
  // invalidatePreferencesCache();
  tree.commit();
  const user = await getMe();
  history.pushState(null, '/dashboard');
}

function teardownSession() {
  localStorage.removeItem('sessionData');
  authentication.set({});
  tree.commit();
}