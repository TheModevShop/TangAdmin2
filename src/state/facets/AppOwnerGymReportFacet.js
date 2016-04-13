import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';


export default function AppOwnerGymReportFacet() {
  return {
    cursors: {
      AppOwnerGymReports: ['views', 'AppOwnerGymReports']
    },
    get(data) {
      return data.AppOwnerGymReports;
    }
  };
};

