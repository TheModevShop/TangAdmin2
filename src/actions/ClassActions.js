import tree from 'state/StateTree';
import {postClass} from 'api/classesApi';
const activeClass = tree.select(['views', 'ClassProfile']);
import _ from 'lodash';
import moment from 'moment';
const AddClass = tree.select(['views', 'AddClass']);
const myGym = tree.select(['user', 'myGym']);

export function setActiveClass() {
  activeClass.set({stale: true});
  tree.commit();
}

export async function addClass(data) {
  AddClass.set({isLoading: true});
  try {
    const post = await postClass(_.get(myGym.get(), 'gymDetails._id'), createClass(data));
    AddClass.set('stale', true);
  } catch (err) {
    AddClass.set('error', err);
  }
  AddClass.set('isLoading', false);
  tree.commit();
}

function createClass(data) {
  return JSON.Stringify(data);
}