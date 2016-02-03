import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (gymId, studentId) => {
    debugger;
    return `${BASE}/gyms/${gymId}/students/${studentId}`;
  },
  successTransformer: (data) => {
    return {
      studentProfile: data.body,
      locations: ['user', 'details', 'gyms']
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
      myGym: ['user', 'myGym'],
      studentProfile: ['views', 'StudentProfile', 'Profile'],
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      if (data.studentProfile && data.studentProfile.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.studentProfile);
      }
      debugger;
      const gymId = _.get(data.myGym, 'gymDetails._id');
      const studentProfile = _.clone(loader.fetch(gymId, id));
      console.log(studentProfile);
      return studentProfile;
    }
  };
};

