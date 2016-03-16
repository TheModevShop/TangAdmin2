import tree from 'state/StateTree';
import bluebird from 'bluebird';
import history from 'appHistory';
import {fetchToken, forgotPassword} from 'api/authApi';
import {getMe} from 'actions/UserActions';
import {resetState} from 'state/ResetStateTree';
import _ from 'lodash';

const authentication = tree.select(['authentication']);

export async function getAuthentication(data) {
  const {email, password} = data;
  try {
    const token = await fetchToken({email, password});
    const me = await buildSession(token.body.token);
    const location = _.find(_.get(me, 'gyms'), {default: true}) || _.get(me, 'gyms[0]');
    if (location.role.name === 'instructor' || location.role.name === 'user') {
      history.pushState(null, '/account');
    } else {
      history.pushState(null, '/dashboard');
    }
    return token;
  } catch (e) {
    authentication.set('error', e);
    return false;
  }
}

export async function checkSession() {
  try {
    const user = await getMe();

    if (user._id) {
      const session = localStorage.getItem('sessionData');
      authentication.set(['sessionData'], session);
      tree.commit();
      const location = _.find(_.get(user, 'gyms'), {default: true}) || _.get(user, 'gyms[0]');
      if (location.role.name === 'instructor' || location.role.name === 'user') {
        history.pushState(null, '/account');
      }
    } else {
      // go to login
      teardownSession();
      return false;
    }
  } catch (err) {
    teardownSession();
    return false;
  }
}

async function buildSession(session) {
  authentication.set(['sessionData'], session);
  localStorage.setItem('sessionData', session);
  tree.commit();
  return await getMe();
}

export async function teardownSession() {
  localStorage.removeItem('sessionData');
  authentication.set({});
  tree.commit();
  setTimeout(() => {
    resetState();
  }, 500);
  history.pushState(null, '/login');
}

export async function submitForgotPassword(data) {
 let response;
 try {
  await forgotPassword(data);
  response = true;
 } catch(e) {
  console.log(e)
  response = false;
 }
 return response;
}