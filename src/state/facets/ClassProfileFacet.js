import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (gymId, sessionId) => {
    return `${BASE}/gyms/${gymId}/sessions/${sessionId}`;
  },
  successTransformer: (data) => {
    return {
      classProfile: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  },
  errorTransformer: (err) => {
    return {
      sessions: [],
      error: err
    };
  }
});

export default function LocationScheduleFacet() {
  return {
    cursors: {
      classProfile: ['views', 'ClassProfile', 'Profile'],
      myGym: ['user', 'myGym']
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      if (data.classProfile && data.classProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.classProfile);
      }
      const gymId = _.get(data.myGym, 'gymDetails._id');
      const classProfile = _.clone(loader.fetch(gymId, id));
      console.log(classProfile);
      return classProfile
    }
  };
};

