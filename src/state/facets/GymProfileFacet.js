import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/` + id;
  },
  successTransformer: (data) => {
    return {
      allGyms: data.body
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
      // IF DOESNT EXISTS GET IT OFF THE WINDOW AND SET IT USING ACTIONS JUST LIKE WE DID IN THE GYMS LIST

      if (data.gymProfile && data.gymProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.gymProfile);
      }
      const gyms = _.clone(loader.fetch(data.activeGymProfileId));
      return gyms
    }
  };
};

