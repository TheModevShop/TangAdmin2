import tree from 'state/StateTree';
import _ from 'lodash';
import {postClass, cancelClassApi, putClass, completeClassApi, removeUserFromSessionApi} from 'api/classesApi';
const activeClass = tree.select(['views', 'ClassProfile']);
const AddClass = tree.select(['views', 'AddClass']);
const myGym = tree.select(['user', 'myGym']);

const PrivatesView = tree.select(['views', 'Privates']);
const PrivatesList = tree.select(['views', 'Privates', 'list']);

const ClassesView= tree.select(['views', 'Classes']);
const ClassList = tree.select(['views', 'Classes', 'list']);

import {clearTransactionsCache, clearClassTransactions} from 'actions/TransactionsActions';

const Dashboard = tree.select(['views', 'Dashboard']);

export function setActiveClass() {
  activeClass.set({stale: true});
  tree.commit();
}

export function clearResponse() {
  AddClass.set('response', null);
  tree.commit();
}

export function setError(error) {
  AddClass.set('response', error);
  tree.commit();
}

export async function addClass(data) {
  let post;
  AddClass.set(['awaitingSave'], true);
  let strData = JSON.stringify(data);
  try {
    post = await postClass(_.get(myGym.get(), 'gymDetails._id'), strData);
    ClassList.set({'stale': true});
    Dashboard.set({'stale': true});
    AddClass.set(['response'], {'success': true, 'message': 'Your class information has been successfully submitted!'});
  } catch (err) {
    AddClass.set(['response'], {'success': false, 'message': 'There was an error submitting your information.'});
  }
  AddClass.set(['awaitingSave'], false);
  tree.commit();
  return post;
}

export async function updateClass(data, classId) {
  let put;
  AddClass.set(['awaitingSave'], true);
  let strData = JSON.stringify(data);
  try {
    put = await putClass(_.get(myGym.get(), 'gymDetails._id'), classId, strData);
    ClassList.set({'stale': true});
    AddClass.set(['response'], {'success': true, 'message': 'Your class information has been successfully update!'});
  } catch (err) {
    AddClass.set(['response'], {'success': false, 'message': 'There was an error updating your information.'});
  }
  AddClass.set(['awaitingSave'], false);
  tree.commit();
  return put;
}

export async function resetAddClass(data) {
  AddClass.set(['response'], null);
}

export async function cancelClasses(ids) {
  cancelClassApi(ids)
}

export async function completeClass(id) {
  let response;  
  try {
    await completeClassApi(id, _.get(myGym.get(), 'gymDetails._id'));
    response = true;
    clearClassesCache();
    clearTransactionsCache();
    activeClass.set({stale: true});
    tree.commit();
  } catch(err) {
    response = false;
  }
  return response;
}

export async function removeUserFromSession(sessionId, userId) {
  let response;  
  try {
    await removeUserFromSessionApi(_.get(myGym.get(), 'gymDetails._id'), sessionId, userId);
    response = true;
    clearClassesCache();
    clearClassTransactions();
    activeClass.set({stale: true});
    tree.commit();
  } catch(err) {
    response = false;
  }
  return response;
}

export function clearClassesCache() {
  ClassesView.set('page', 0);
  ClassList.set({stale: true});
  tree.commit();
}

export function clearPrivatesCache() {
  PrivatesView.set('page', 0);
  PrivatesList.set({stale: true});
  tree.commit();
}

