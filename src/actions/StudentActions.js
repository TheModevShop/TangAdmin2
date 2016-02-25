import tree from 'state/StateTree';
import {editRole} from 'api/userApi';
import _ from 'lodash';

const gymStudentsCursor = tree.select(['views', 'GymStudents']);
const gymInstructorsCursor = tree.select(['views', 'GymInstructors']);
const StudentProfile = tree.select(['views', 'StudentProfile']);
const StudentTable = tree.select(['views', 'StudentProfile', 'StudentTable']);
const myGym = tree.select(['user', 'myGym']);

export function clearResponse() {
  StudentProfile.set('response', null);
  tree.commit();
}

export function setActiveStudent() {
  StudentProfile.set({stale: true});
  tree.commit();
}

export function StudentTableAction(bool) {
  StudentTable.set({stale: true});
  StudentTable.set({private: bool})
  tree.commit();
}

export async function setAsInstructor(userId, roleId) {
  gymStudentsCursor.set({isLoading: true});
  try {
    const put = await editRole(userId, {
      gym: _.get(myGym.get(), 'gymDetails._id'),
      role: roleId
    });
    gymStudentsCursor.set('stale', true); // this will cause to refetch
    gymInstructorsCursor.set({stale: true});
    StudentProfile.set(['response'], {'success': true, 'message': 'Your profile has been successfully updated!'});
  } catch (err) {
    StudentProfile.set(['response'], {'success': false, 'message': 'There was an error updating your profile!'});
    gymStudentsCursor.set('error', err);
  }
  gymStudentsCursor.set('isLoading', false);
  tree.commit();
}


