import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, type) => {
    return `${BASE}/users/${id}/sessions?private=true`;
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

export default function StudentPrivatesFacet() {
  return {
    cursors: {
      StudentProfile: ['views', 'StudentProfile'],
      StudentPrivatesTable: ['views', 'StudentProfile', 'StudentPrivatesTable']
    },
    get(data) {
      const student = _.get(data.StudentProfile.profile, '_id');

      if (data.StudentPrivatesTable && data.StudentPrivatesTable.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.StudentPrivatesTable);
      }

      const StudentPrivates = _.clone(loader.fetch(student));
      console.log(StudentPrivates);
      return StudentPrivates;
    }
  };
};

