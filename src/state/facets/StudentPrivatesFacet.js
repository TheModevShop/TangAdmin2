import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, type) => {
    return `${BASE}/users/${id}/sessions?private=true`;
  },
  successTransformer: (data) => {
    return {
      privates: data.body
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
      const student = _.get(data.StudentProfile.profile, '_id') || window.location.href.split('/').pop();
    
      if (data.StudentPrivatesTable && data.StudentPrivatesTable.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.StudentPrivatesTable);
      }

      const StudentPrivates = _.clone(loader.fetch(student));
      return StudentPrivates;
    }
  };
};

