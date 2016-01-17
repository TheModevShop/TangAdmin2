import tree from 'state/StateTree';
import {postClass} from 'api/classesApi';
import _ from 'lodash';
import moment from 'moment';

const addClassViewCursor = tree.select(['views', 'AddClass']);
const myGym = tree.select(['user', 'myGym']);

export async function addClass(data) {
  addClassViewCursor.set({awaitingSave: true});
  try {
    await postClass(_.get(myGym.get(), 'gymDetails._id'), createClass(data));
    // set classes as stale
  } catch (err) {
    addClassViewCursor.set('error', err);
  }
  addClassViewCursor.set('awaitingSave', false);
  tree.commit();
}

function createClass(data) {
  return JSON.Stringify(data);
}