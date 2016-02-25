import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, type) => {
    return `${BASE}/users/${id}/sessions?private=${type}`;
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

export default function StudentClassesFacet() {
  return {
    cursors: {
      StudentProfile: ['views', 'StudentProfile'],
      StudentTable: ['views', 'StudentProfile', 'StudentTable']
    },
    get(data) {
      const student = _.get(data.StudentProfile.profile, '_id');

      if (data.StudentTable && data.StudentTable.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.StudentTable);
      }

      const prvt = _.get(data.StudentTable, 'private');

      const StudentClasses = _.clone(loader.fetch(student, prvt));
      return StudentClasses;
    }
  };
};

