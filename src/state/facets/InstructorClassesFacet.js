import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, instructor) => {
    return `${BASE}/gyms/${id}/sessions?instructor=${instructor}&private=true`;
  },
  successTransformer: (data) => {
    return {
      classes: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function InstructorClassesFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      InstructorProfile: ['views', 'InstructorProfile'],
      InstructorTable: ['views', 'InstructorProfile', 'InstructorTable']
    },
    get(data) {
      const gymId = _.get(data, 'myGym.gymDetails._id');
      const instructor = _.get(data.InstructorProfile.profile, '_id');

      if (data.InstructorTable && data.InstructorTable.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.InstructorTable);
      }

      const instructorClasses = _.clone(loader.fetch(gymId, instructor));
      return instructorClasses;
    }
  };
};

