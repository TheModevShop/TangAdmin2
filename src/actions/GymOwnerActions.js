import tree from 'state/StateTree';
import {editRole} from 'api/userApi';
import _ from 'lodash';

const myGym = tree.select(['user', 'myGym']);
const GymOwnerProfile = tree.select(['views', 'GymOwnerProfile']);

export function clearResponse() {
  GymOwnerProfile.set('response', null);
  tree.commit();
}

export function setActiveGymOwner() {
  GymOwnerProfile.set({stale: true});
  tree.commit();
}

export async function editGymOwnerRole(userId, roleId) {
  let put;
  let gymId = _.get(myGym.get(), 'gymDetails._id');
  try {
    put = await editRole(userId, {gym: gymId, role: roleId});
    GymOwnerProfile.set(['response'], {'success': true, 'message': 'Your profile has been successfully updated!'});
  } catch (err) {
  	GymOwnerProfile.set(['response'], {'success': false, 'message': 'There was an error updating your profile!'});
  }
  tree.commit();
}