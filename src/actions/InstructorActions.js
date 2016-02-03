import tree from 'state/StateTree';
import {editUser} from 'api/userApi';
import _ from 'lodash';

const myGym = tree.select(['user', 'myGym']);
const gymStudentsCursor = tree.select(['views', 'GymStudents']);
const gymInstructorsCursor = tree.select(['views', 'GymInstructors']);
const activeInstructor = tree.select(['views', 'InstructorProfile']);

export function setActiveInstructor() {
  activeInstructor.set({stale: true});
  tree.commit();
}

export async function editRole(userId, roleId) {
  gymInstructorsCursor.set({stale: true});
  try {
    const put = await editUser(userId, {
      gym: _.get(myGym.get(), 'gymDetails._id'),
      role: roleId
    });
    gymInstructorsCursor.set({stale: true});
    gymStudentsCursor.set('stale', true); // this will cause to refetch
  } catch (err) {
    gymInstructorsCursor.set('error', err);
  }
  gymInstructorsCursor.set('isLoading', false);
  tree.commit();
}