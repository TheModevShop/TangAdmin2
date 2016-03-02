import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/users/${id}`;
  },
  successTransformer: (data) => {
    return {
      profile: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function GymOwnerProfileFacet() {
  return {
    cursors: {
      GymOwnerProfile: ['views', 'GymOwnerProfile'],
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      if (data.GymOwnerProfile && data.GymOwnerProfile.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.GymOwnerProfile);
      }

      const GymOwnerProfile = _.clone(loader.fetch(id));
      return GymOwnerProfile;
    }
  };
};

