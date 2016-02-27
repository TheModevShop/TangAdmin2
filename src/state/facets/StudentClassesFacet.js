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
      studentClassesTable: ['views', 'StudentProfile', 'studentClassesTable']
    },
    get(data) {
      const student = _.get(data.StudentProfile.profile, '_id')  || window.location.href.split('/').pop();

      if (data.studentClassesTable && data.studentClassesTable.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.studentClassesTable);
      }

      const StudentClasses = _.clone(loader.fetch(student));
      return StudentClasses;
    }
  };
};

