import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/sessions`;
  },
  successTransformer: (data) => {
    return {
      allClasses: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  },
  errorTransformer: (err) => {
    return {
      sessions: [],
      error: err
    };
  }
});

export default function LocationScheduleFacet() {
  return {
    cursors: {
      classes: ['views', 'ClassList'],
      myGym: ['user', 'myGym']
    },
    get(data) {
      if (data.classes && data.classes.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.classes);
      }
      const classes = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id')));
      return classes
    }
  };
};

