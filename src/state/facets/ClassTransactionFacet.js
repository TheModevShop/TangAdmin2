import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';
const LIMIT = 20;

const loader = new RESTLoader({
  getResourceUrl: (id, data, offset) => {
    const className = data.className || '';
    const instructor = data.instructor || '';
    const student = data.student || '';
    // add query params to get. might need to add classname to server
    return `${BASE}/gyms/${id}/transactions?lname=${className}&instructor=${instructor}&student=${student}`;
  },
  successTransformer: (data) => {
    return {
      transactions: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function ClassTransactionsFacet() {
  return {
    cursors: {
      ClassTransactions: ['views', 'ClassTransactions'],
      myGym: ['user', 'myGym'],
    },
    get(data) {
      const gymId = _.get(data.myGym, 'gymDetails._id');
      const id = window.location.href.split('/').pop();
      
      if (data.ClassTransactions && data.ClassTransactions.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.ClassTransactions);
      }
      const ClassTransactions = _.clone(loader.fetch(gymId, id));
      return ClassTransactions;
    }
  };
};

