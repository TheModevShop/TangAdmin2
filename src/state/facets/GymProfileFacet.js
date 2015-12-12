import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}`;
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
      gymProfile: ['views', 'GymProfile', 'Profile']
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      
      if (data.gymProfile && data.gymProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.gymProfile);
      }
      const gymProfile = _.clone(loader.fetch(id));
      return gymProfile
    }
  };
};

