import unsupportedBrowser from './unsupportedBrowserOnEnter';
import tree from 'state';
export default function authOnEnter(redirect, hasAccess) {
  return function onEnter(nextState, replaceState, callback) {
    const session = tree.get(['authentication', 'sessionData']);
    if (!session) {
      replaceState(null, '/'+redirect);
    }
    if (unsupportedBrowser(nextState)) {
      replaceState(null, '/unsupported-browser');
    }
    if (session && hasAccess) {
      if (!hasAccess()) {
        replaceState(null, '/');
      }
    };

    callback();
  };
}