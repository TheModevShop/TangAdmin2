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
  return {
    name: data.name,
    date: data.date,
    start: data.start,
    end: moment(data.start, 'H:mm').add(parseInt(data.duration), 'minutes').format('H:mm'),
    description: data.description,
    capacity: parseInt(data.capacity),
    private: false,
    complete: false,
    enrolled: [],
    instructorId: data.instructor ? data.startTime : null
  }
}

