import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/students`;
  },
  successTransformer: (data) => {
    return {
      allStudents: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      allStudents: [],
      error: err
    };
  }
});

export default function GymStudentsFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      students: ['views', 'GymStudents'],
    },
    get(data) {
      const myGymId = _.get(data, 'myGym.gymDetails._id');
      
      if (data.students && data.students.stale) {
        loader.invalidateCache();
      }
      
      if (!loader.cursor) {
        loader.setCursor(this.cursors.students);
      }
      const students = _.clone(loader.fetch(myGymId));
      return students
    }
  };
};

