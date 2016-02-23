import tree from 'state/StateTree';
import _ from 'lodash';
import {postClass, cancelClassApi, putClass} from 'api/classesApi';
const activeClass = tree.select(['views', 'ClassProfile']);
const AddClass = tree.select(['views', 'AddClass']);
const ClassList = tree.select(['views', 'ClassList']);
const myGym = tree.select(['user', 'myGym']);

export function setActiveClass() {
  activeClass.set({stale: true});
  tree.commit();
}

export function clearResponse() {
  AddClass.set('response', null);
  tree.commit();
}

export async function addClass(data) {
  let post;
  AddClass.set(['awaitingSave'], true);
  let strData = JSON.stringify(data);
  try {
    post = await postClass(_.get(myGym.get(), 'gymDetails._id'), strData);
    ClassList.set({'stale': true});
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
