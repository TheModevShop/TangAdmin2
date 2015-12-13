import tree from 'state/StateTree';
import bluebird from 'bluebird';
import history from 'appHistory';
import {fetchToken} from 'api/authApi';
import {getMe} from 'actions/userActions';
const authentication = tree.select(['authentication']);
const userCursor = tree.select(['user']);

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
  if (user._id) {
    const session = localStorage.getItem('sessionData');
    authentication.set(['sessionData'], session);
    tree.commit();
    history.pushState(null, '/dashboard');
  } else {
    // go to login
    teardownSession();
    return false;
  }
}

async function buildSession(session) {
  authentication.set(['sessionData'], session);
  localStorage.setItem('sessionData', session);
  tree.commit();
  const user = await getMe();
  history.pushState(null, '/dashboard');
}

export async function teardownSession() {
  localStorage.removeItem('sessionData');
  authentication.set({});
  history.pushState(null, '/login');
  tree.commit();
}