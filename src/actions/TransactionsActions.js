import tree from 'state/StateTree';
import {refundTransaction, retryChargeApi} from 'api/transactionsApi';
import _ from 'lodash';

const activeClass = tree.select(['views', 'TransactionProfile']);
const myGym = tree.select(['user', 'myGym']);

const TransactionsView = tree.select(['views', 'Transactions']);
const TransactionsList = tree.select(['views', 'Transactions', 'list']);
const activeTransaction = tree.select(['views', 'TransactionProfile', 'activeTransaction']);

const classTransactions = tree.select(['views', 'ClassTransactions']);

export function setActiveTransaction() {
	activeTransaction.set({stale: true});
	tree.commit();
}

export function clearTransactionsCache() {
  TransactionsView.set('page', 0);
  TransactionsList.set(null);
  tree.commit();
}

export async function refund(id) {
  let response;  
  try {
    await refundTransaction(id, _.get(myGym.get(), 'gymDetails._id'));
    response = true;
    TransactionsView.set('page', 0);
    TransactionsList.set(null);
    activeTransaction.set(null);
    tree.commit();
  } catch(err) {
    response = false;
  }
  return response;
}

export async function retryCharge(id, user) {
  let response;  
  try {
    await retryChargeApi(id, _.get(myGym.get(), 'gymDetails._id'), user)
    response = true;
    TransactionsView.set('page', 0);
    TransactionsList.set(null);
    activeTransaction.set(null);
    tree.commit();
  } catch(err) {
    response = false;
    if (_.get(err, 'body.code') === "card_declined") {
      response = 'declined';
    }
  }
  return response;
}

export function clearClassTransactions() {
  classTransactions.set(null);
  tree.commit();
}
