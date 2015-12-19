import tree from 'state/StateTree';
import {editUser} from 'api/userApi';
import _ from 'lodash';

const gymStudentsCursor = tree.select(['views', 'GymStudents']);
const myGym = tree.select(['user', 'myGym']);



export async function setAsInstructor(id) {
  gymStudentsCursor.set({isLoading: true});
  try {
    console.log(myGym.get())
    const put = await editUser({
      gym: _.get(myGym.get(), 'gymDetails._id'),
      role: '56623e7194aad7801f591ce0'
    });
    gymStudentsCursor.set('stale', true); // this will cause to refetch
  } catch (err) {
    gymStudentsCursor.set('error', err);
  }
  gymStudentsCursor.set('isLoading', false);
  tree.commit();
}


