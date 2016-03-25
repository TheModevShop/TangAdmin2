import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';
const LIMIT = 20;

const loader = new RESTLoader({
  getResourceUrl: (id, data, offset) => {
    const className = data.className || '';
    const startDate = data.startDate ? moment(data.startDate).format('YYYYMMDD') : '';
    const endDate = data.endDate ? moment(data.endDate).format('YYYYMMDD') : '';
    const instructor = data.instructor || '';
    const student = data.student || '';
    // add query params to get. might need to add classname to server
    return `${BASE}/gyms/${id}/sessions?showHistorical=true&limit=${LIMIT}&offset=${offset}&private=false&name=${className}&instructor=${instructor}&student=${student}&startDate=${startDate}&endDate=${endDate}`;
  },
  successTransformer: (data, current) => {
    const numberReturned = data.body.length;
    data.body = current && current.allClasses ? current.allClasses.concat(data.body) : data.body;
    return {
      offset: _.get(data, 'body.length', 0),
      depleted: numberReturned < LIMIT,
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
      myGym: ['user', 'myGym'],
      tableFilters: ['tableFilters'],
      classes: ['views', 'Classes', 'list'],
      classesView: ['views', 'Classes'],
    },
    get(data) {
      if (data.classes && data.classes.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.classes);
      }
      // when we want to initiate a query we might need to add a search button to then set stale on the table to it refetches with new params
      const offset = _.get(data, 'classes.offset', 0);
      const tableFilter = data.tableFilters.classes || {};
      const classes = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), tableFilter, offset));
      
      const page = data.classesView.page;
      var cloned = _.cloneDeep(classes);

      if (cloned.allClasses) {
        cloned.allClasses = cloned.allClasses.splice(LIMIT*page, LIMIT);
        cloned.page = page;
        cloned.hideNextButton = cloned.depleted && cloned.allClasses.length < LIMIT;
      }

      return cloned
    }
  };
};

