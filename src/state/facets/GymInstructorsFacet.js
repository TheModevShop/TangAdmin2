import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/instructors`;
  },
  successTransformer: (data) => {
    return {
      allInstructors: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      allInstructors: [],
      error: err
    };
  }
});

export default function GymInstructorsFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      instructors: ['views', 'GymInstructors'],
    },
    get(data) {
      const myGymId = _.get(data, 'myGym.gymDetails._id');
      debugger; 
      if (data.instructors && data.instructors.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.instructors);
      }
      const instructors = _.clone(loader.fetch(myGymId));
      return instructors
    }
  };
};

