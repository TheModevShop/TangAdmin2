import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';


export default function GymOwnerReportFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      gymOwnerReports: ['views', 'GymOwnerReports'],
      tableFilters: ['tableFilters']
    },
    get(data) {
      const gymOwnerReports = data.gymOwnerReports;
      return gymOwnerReports;
    }
  };
};

