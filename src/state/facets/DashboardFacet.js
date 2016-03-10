import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/sessions?hasEnrollmentOrClass=true`;
  },
  successTransformer: (data) => {
    return {
      allClasses: data.body,
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function CalendarFacet() {
  return {
    cursors: {
      Dashboard: ['views', 'Dashboard'],
      myGym: ['user', 'myGym'],
      tableFilters: ['tableFilters']
    },
    get(data) {
      if (data.Dashboard && data.Dashboard.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.Dashboard);
      }
      // when we want to initiate a query we might need to add a search button to then set stale on the table to it refetches with new params
      const Dashboard = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), data.tableFilters));
      return Dashboard
    }
  };
};

