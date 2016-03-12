import tree from 'state/StateTree';
import _ from 'lodash';

const TransactionsView = tree.select(['views', 'Transactions']);
const TransactionsList = tree.select(['views', 'Transactions', 'list']);

export function clearTransactionsCache() {
  TransactionsView.set('page', 0);
  TransactionsList.set(null);
  tree.commit();
}
