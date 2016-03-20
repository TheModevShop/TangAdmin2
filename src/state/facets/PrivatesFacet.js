import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';
const LIMIT = 20;

const loader = new RESTLoader({
  getResourceUrl: (id, data, offset) => {
    const startDate = data.startDate ? moment(data.startDate).format('YYYYMMDD') : '';
    const endDate = data.endDate ? moment(data.endDate).format('YYYYMMDD') : '';
    const instructor = data.instructor || '';
    const student = data.student || '';
    // add query params to get. might need to add classname to server
    return `${BASE}/gyms/${id}/sessions?showHistorical=true&limit=${LIMIT}&offset=${offset}&private=true&onlyEnrolled=true&instructor=${instructor}&student=${student}&startDate=${startDate}&endDate=${endDate}`;
  },
  successTransformer: (data, current) => {
    const numberReturned = data.body.length;
    data.body = current && current.allPrivates ? current.allPrivates.concat(data.body) : data.body;
    return {
      offset: _.get(data, 'body.length', 0),
      depleted: numberReturned < LIMIT,
      allPrivates: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  }
});

export default function PrivatesFacet() {
  return {
    cursors: {
      privates: ['views', 'Privates', 'list'],
      privatesView: ['views', 'Privates'],
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
      const offset = _.get(data, 'privates.offset', 0);
      const privates = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), data.tableFilters, offset));
      
      const page = data.privatesView.page;
      var cloned = _.cloneDeep(privates);

      if (cloned.allPrivates) {
        cloned.allPrivates = cloned.allPrivates.splice(LIMIT*page, LIMIT);
        cloned.page = page;
        cloned.hideNextButton = cloned.depleted && cloned.allPrivates.length < LIMIT;
      }

      return cloned
    }
  };
};

