import tree from 'state';
const deviceType = tree.get(['browser', 'device', 'type']);

export default function unsupportedBrowser(nextState) {
  const nextPath = nextState.location.pathname;
  if (deviceType &&
    (deviceType === 'mobile' || deviceType === 'tablet') &&
    nextPath !== '/unsupported-browser' &&
    nextPath !== '/landing' &&
    nextPath !== '/') {
    return true;
  }
  return false;
}



  