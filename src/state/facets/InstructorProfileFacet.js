import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (gymId, instructorId) => {
    return `${BASE}/gyms/${gymId}/instructors/${instructorId}/profile`;
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

export default function InstructorProfileFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      InstructorProfile: ['views', 'InstructorProfile'],
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      if (data.InstructorProfile && data.InstructorProfile.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.InstructorProfile);
      }

      const gymId = _.get(data.myGym, 'gymDetails._id');
      const InstructorProfile = _.clone(loader.fetch(gymId, id));
      return InstructorProfile;
    }
  };
};

