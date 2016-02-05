import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, studentId) => {
    return `${BASE}/gyms/${id}/students/${studentId}/profile`;
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
      studentProfile: ['views', 'StudentProfile', 'Profile'],
      myGym: ['user', 'myGym'],
    },
    get(data) {
      const gymId = _.get(data.myGym, 'gymDetails._id');
      const id = window.location.href.split('/').pop();
      
      if (data.studentProfile && data.studentProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.studentProfile);
      }
      const studentProfile = _.clone(loader.fetch(gymId, id));
      return studentProfile
    }
  };
};

