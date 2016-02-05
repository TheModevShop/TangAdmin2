import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (gymId, instructorId) => {
    return `${BASE}/gyms/${gymId}/instructors/${instructorId}/profile`;
  },
  successTransformer: (data) => {
    return {
      instructorProfile: data.body,
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
      instructorProfile: ['views', 'InstructorProfile', 'Profile'],
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      if (data.instructorProfile && data.instructorProfile.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.instructorProfile);
      }

      const gymId = _.get(data.myGym, 'gymDetails._id');
      const instructorProfile = _.clone(loader.fetch(gymId, id));
      return instructorProfile;
    }
  };
};

