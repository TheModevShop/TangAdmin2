import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, data) => {
    const className = data.className || '';
    const startDate = data.startDate ? moment(data.startDate).format('YYYYMMDD') : '';
    const endDate = data.endDate ? moment(data.endDate).format('YYYYMMDD') : '';
    const instructor = data.instructor || '';
    const student = data.student || '';
    // add query params to get. might need to add classname to server
    return `${BASE}/gyms/${id}/sessions?private=false&name=${className}&instructor=${instructor}&student=${student}&startDate=${startDate}&endDate=${endDate}`;
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
      // when we want to initiate a query we might need to add a search button to then set stale on the table to it refetches with new params
      const classes = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), data.tableFilters));
      return classes
    }
  };
};

