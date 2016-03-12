import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';
const LIMIT = 20;

const loader = new RESTLoader({
  getResourceUrl: (id, data, offset) => {
    const className = data.className || '';
    const startDate = data.startDate ? moment(data.startDate).format() : '';
    const endDate = data.endDate ? moment(data.endDate).format() : '';
    const instructor = data.instructor || '';
    const student = data.student || '';
    // add query params to get. might need to add classname to server
    return `${BASE}/gyms/${id}/transactions?limit=${LIMIT}&offset=${offset}&name=${className}&instructor=${instructor}&student=${student}&startDate=${startDate}&endDate=${endDate}`;
  },
  
  successTransformer: (data, current) => {
    const numberReturned = data.body.length;
    data.body = current && current.allTransactions ? current.allTransactions.concat(data.body) : data.body;
    return {
      offset: _.get(data, 'body.length', 0),
      depleted: numberReturned < LIMIT,
      allTransactions: data.body
    };
  }

});

export default function TransactionsFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      transactions: ['views', 'Transactions', 'list'],
      transactionsView: ['views', 'Transactions'],
      tableFilters: ['tableFilters']
    },
    get(data) {
      if (data.transactions && data.transactions.stale) {
        loader.invalidateCache();
      }

      if (!loader.cursor) {
        loader.setCursor(this.cursors.transactions);
      }

      const offset = _.get(data, 'transactions.offset', 0);
      const transactions = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id'), data.tableFilters, offset));

      const page = data.transactionsView.page;
      var cloned = _.cloneDeep(transactions);

      if (cloned.allTransactions) {
        cloned.allTransactions = cloned.allTransactions.splice(LIMIT*page, LIMIT);
        cloned.page = page;
        cloned.hideNextButton = cloned.depleted && cloned.allTransactions.length < LIMIT
      }

      return cloned
    }
  };
};

