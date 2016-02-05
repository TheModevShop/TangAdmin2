import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/users/${id}`;
  },
  successTransformer: (data) => {
    return {
      studentProfile: data.body
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
      studentProfile: ['views', 'StudentProfile', 'Profile']
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      
      if (data.studentProfile && data.studentProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.studentProfile);
      }
      const studentProfile = _.clone(loader.fetch(id));
      return studentProfile
    }
  };
};

