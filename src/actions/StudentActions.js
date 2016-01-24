import tree from 'state/StateTree';
import {editUser} from 'api/userApi';
import _ from 'lodash';

const gymStudentsCursor = tree.select(['views', 'GymStudents']);
const gymInstructorsCursor = tree.select(['views', 'GymInstructors']);
const myGym = tree.select(['user', 'myGym']);
const roles = tree.select(['roles']);



export async function setAsInstructor(id) {
  gymStudentsCursor.set({isLoading: true});
  try {
    const put = await editUser(id, {
      gym: _.get(myGym.get(), 'gymDetails._id'),
      role: _.find(roles.get(), {name: 'instructor'})._id
    });
    gymStudentsCursor.set('stale', true); // this will cause to refetch
    gymInstructorsCursor.set({stale: true});
  } catch (err) {
    gymStudentsCursor.set('error', err);
  }
  gymStudentsCursor.set('isLoading', false);
  tree.commit();
}


