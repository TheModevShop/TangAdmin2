import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/` + id;
  },
  successTransformer: (data) => {
    return {
      gymProfile: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function LocationScheduleFacet() {
  return {
    cursors: {
      gymProfile: ['views', 'GymProfile', 'Profile'],
      activeGymProfileId: ['views', 'GymProfile', 'ActiveId'],
    },
    get(data) {
      var id = window.location.href.split('/').pop();
      data.activeGymProfileId = id;
      console.log('GYM ACTIVE ID', data.activeGymProfileId);
      if (data.gymProfile && data.gymProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.gymProfile);
        loader.setCursor(this.cursors.activeGymProfileId);
      }
      const gymProfile = _.clone(loader.fetch(data.activeGymProfileId));
      return gymProfile
    }
  };
};

