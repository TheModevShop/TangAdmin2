import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, data) => {
    const className = data.className;
    const startDate = data.startDate;
    const endDate = data.endDate;
    const instructor = data.instructor;
    // add query params
    return `${BASE}/gyms/${id}/sessions?private=false`;
  },
  successTransformer: (data) => {
    return {
      allClasses: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function ClassesFacet() {
  return {
    cursors: {
      classes: ['views', 'ClassList'],
      myGym: ['user', 'myGym'],
      tableFilters: ['tableFilters']
    },
    get(data) {
      if (data.classes && data.classes.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.classes);
      }


      const classes = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), data.tableFilters));
      return classes
    }
  };
};

