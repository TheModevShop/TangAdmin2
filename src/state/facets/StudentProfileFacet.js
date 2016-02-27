import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, studentId) => {
    return `${BASE}/gyms/${id}/students/${studentId}/profile`;
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

export default function StudentProfileFacet() {
  return {
    cursors: {
      StudentProfile: ['views', 'StudentProfile'],
      myGym: ['user', 'myGym'],
    },
    get(data) {
      const gymId = _.get(data.myGym, 'gymDetails._id');
      const id = window.location.href.split('/').pop();
      console.log(data)
      
      if (data.StudentProfile && data.StudentProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.StudentProfile);
      }
      const StudentProfile = _.clone(loader.fetch(gymId, id));
      return StudentProfile
    }
  };
};

