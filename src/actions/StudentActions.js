import tree from 'state/StateTree';
import {editUser} from 'api/userApi';
import _ from 'lodash';

const gymStudentsCursor = tree.select(['views', 'GymStudents']);
const gymInstructorsCursor = tree.select(['views', 'GymInstructors']);
const activeStudent = tree.select(['views', 'StudentProfile']);
const myGym = tree.select(['user', 'myGym']);

export function setActiveStudent() {
  activeStudent.set({stale: true});
  tree.commit();
}

export async function setAsInstructor(userId, roleId) {
  gymStudentsCursor.set({isLoading: true});
  try {
    const put = await editUser(userId, {
      gym: _.get(myGym.get(), 'gymDetails._id'),
      role: roleId
    });
    gymStudentsCursor.set('stale', true); // this will cause to refetch
    gymInstructorsCursor.set({stale: true});
  } catch (err) {
    gymStudentsCursor.set('error', err);
  }
  gymStudentsCursor.set('isLoading', false);
  tree.commit();
}


