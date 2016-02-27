import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, type) => {
    return `${BASE}/users/${id}/sessions?private=false`;
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
      StudentClassesTable: ['views', 'StudentProfile', 'StudentClassesTable']
    },
    get(data) {
      const student = _.get(data.StudentProfile.profile, '_id');

      if (data.StudentClassesTable && data.StudentClassesTable.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.StudentClassesTable);
      }

      const StudentClasses = _.clone(loader.fetch(student));
      console.log(StudentClasses);
      return StudentClasses;
    }
  };
};

