import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/sessions`;
  },
  successTransformer: (data) => {
    console.log(data)
    return {
      allClasses: data.body
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
    },
    get(data) {
      if (data.classes && data.classes.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.classes);
      }
      const classes = _.clone(loader.fetch());
      return classes
    }
  };
};

