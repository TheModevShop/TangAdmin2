import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: () => {
    return `${BASE}/roles`;
  },
  successTransformer: (data) => {
    return {
      roles: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function LocationScheduleFacet() {
  return {
    cursors: {
      studentProfile: ['views', 'StudentProfile', 'Roles'],
      instructorProfile: ['views', 'InstructorProfile', 'Roles'],
    },
    get(data) {
      if (data.Roles && data.roles.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.studentProfile);
        loader.setCursor(this.cursors.instructorProfile);
      }
      const roles = _.clone(loader.fetch());
      return roles
    }
  };
};

