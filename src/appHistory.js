import createHistory from 'history/lib/createBrowserHistory';
import {canUseDOM} from 'exenv';

// Replace hash routes from old urls
if (canUseDOM && window.location.hash && window.history.replaceState) {
  const pathname = window.location.hash.split('#')[1];
  window.history.replaceState(null, null, pathname);
}

const history = createHistory();

let state;
history.listen((s) => state = s);

export function getState() {
  return state || {};
}

export default history;