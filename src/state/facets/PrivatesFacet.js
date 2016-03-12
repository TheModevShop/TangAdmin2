import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id, data) => {
    const startDate = data.startDate ? moment(data.startDate).format('YYYYMMDD') : '';
    const endDate = data.endDate ? moment(data.endDate).format('YYYYMMDD') : '';
    const instructor = data.instructor || '';
    const student = data.student || '';
    // add query params to get. might need to add classname to server
    return `${BASE}/gyms/${id}/sessions?private=true&onlyEnrolled=true&instructor=${instructor}&student=${student}&startDate=${startDate}&endDate=${endDate}`;
  },
  successTransformer: (data) => {
    return {
      allPrivates: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function PrivatesFacet() {
  return {
    cursors: {
      privates: ['views', 'PrivatesList'],
      myGym: ['user', 'myGym'],
      tableFilters: ['tableFilters']
    },
    get(data) {
      if (data.privates && data.privates.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.privates);
      }
      const privates = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), data.tableFilters));
      return privates
    }
  };
};

