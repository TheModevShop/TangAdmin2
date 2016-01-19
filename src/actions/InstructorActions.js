import tree from 'state/StateTree';
import moment from 'moment';
const activeInstructor = tree.select(['views', 'InstructorProfile']);

export function setActiveInstructor() {
  activeInstructor.set({stale: true});
  tree.commit();
}
