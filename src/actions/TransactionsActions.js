import tree from 'state/StateTree';
const activeClass = tree.select(['views', 'TransactionProfile']);
import _ from 'lodash';

const TransactionsView = tree.select(['views', 'Transactions']);
const TransactionsList = tree.select(['views', 'Transactions', 'list']);


export function setActiveTransaction() {
	activeTransaction.set({stale: true});
	tree.commit();
}
export function clearTransactionsCache() {
  TransactionsView.set('page', 0);
  TransactionsList.set(null);
  tree.commit();
}
