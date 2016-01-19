import tree from 'state/StateTree';
import {postClass} from 'api/classesApi';
const activeClass = tree.select(['views', 'ClassProfile']);
import _ from 'lodash';
import moment from 'moment';
const ClassList = tree.select(['views', 'ClassList']);
const myGym = tree.select(['user', 'myGym']);

export function setActiveClass() {
  activeClass.set({stale: true});
  tree.commit();
}

export async function addClass(data) {
  ClassList.set({isLoading: true});
  try {
    const post = await postClass(_.get(myGym.get(), 'gymDetails._id'), createClass(data));
    ClassList.set('stale', true);
  } catch (err) {
    ClassList.set('error', err);
  }
  ClassList.set('isLoading', false);
  tree.commit();
}

function createClass(data) {
  return JSON.stringify(data);
}