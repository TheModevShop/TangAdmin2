import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/transactions`;
  },
  successTransformer: (data) => {
    return {
      allTransactions: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      transactions: [],
      error: err
    };
  }
});

export default function TransactionsFacet() {
  return {
    cursors: {
      myGym: ['user', 'myGym'],
      transactions: ['views', 'Transactions'],
    },
    get(data) {
      if (data.transactions && data.transactions.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.transactions);
      }
      const transactions = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id')));
      return transactions
    }
  };
};

