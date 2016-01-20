import tree from 'state/StateTree';
import _ from 'lodash';
import moment from 'moment';

import {postClass} from 'api/classesApi';
const activeClass = tree.select(['views', 'ClassProfile']);
const AddClass = tree.select(['views', 'AddClass']);
const ClassList = tree.select(['views', 'ClassList']);
const myGym = tree.select(['user', 'myGym']);

export function setActiveClass() {
  activeClass.set({stale: true});
  tree.commit();
}

export async function addClass(data) {
  let post;
  AddClass.set(['awaitingSave'], true);
  try {
   post = await postClass(_.get(myGym.get(), 'gymDetails._id'), createClass(data));
    ClassList.set('stale', true);
    AddClass.set(['error'], false);
  } catch (err) {
    AddClass.set(['error'], err);
  }
  AddClass.set(['awaitingSave'], false);
  tree.commit();
  return post.body;
}

function createClass(data) {
  return JSON.stringify(data);
}