import tree from 'state/StateTree';
import {postClass} from 'api/classesApi';

const addClassViewCursor = tree.select(['views', 'AddClass']);

export async function addClass(data) {
  addClassViewCursor.set({awaitingSave: true});
  try {
    const postClass = await postClass(data);
    // 
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
      start: data.startTime,
      end: moment(data.startTime, 'H:mm').add(data.duration, 'minutes').format('H:mm'),
      description: data.description,
      capacity: data.capacity,
      private: false,
      complete: false,
      enrolled: [],
      instructorId: data.instructor ? data.startTime : null
    }
}

