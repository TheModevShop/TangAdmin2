import tree from 'state/StateTree';
import {postGym, postGymUpdate, addPhotosApi} from 'api/locationsApi';
import {createAdmin} from 'api/authApi';
const gymList = tree.select(['views', 'GymList']);
const addGymCursor = tree.select(['views', 'AddGym']);

export function clearResponse() {
  addGymCursor.set('response', null);
  tree.commit();
}

export async function addGym(data) {
  let post;
  addGymCursor.set(['awaitingSave'], true);
  const dataStr = JSON.stringify(data);
  try {
    post = await postGym(dataStr); 
    gymList.set({stale: true}); // this will cause to refetch
    addGymCursor.set(['data'], post.body);
    addGymCursor.set(['response'], {'success': true, 'message': 'Your gym information has been successfully submitted!'});
  } catch (err) {
    post = null;
    addGymCursor.set(['response'], {'success': false, 'message': 'There was an error submitting your information.'});
  }
  addGymCursor.set(['awaitingSave'], false);
  tree.commit();
  return post;
}

export async function updateGym(data, gymId) {
  let update;
  addGymCursor.set(['awaitingSave'], true);
  const dataStr = JSON.stringify(data);
  try {
    update = await postGymUpdate(dataStr, gymId);
    gymList.set({stale: true}); // this will cause to refetch
    addGymCursor.set(['data'], post.body);
    addGymCursor.set(['response'], {'success': true, 'message': 'Your gym information has been successfully submitted!'});
  } catch (err) {
    update = null;
    addGymCursor.set(['response'], {'success': false, 'message': 'There was an error submitting your information.'});
  }
  addGymCursor.set(['awaitingSave'], false);
  tree.commit();
  return update;
}

export async function addGymOwner(data, gymId) {
  let update;
  addGymCursor.set(['awaitingSave'], true);
  try {
    update = await createAdmin(data, gymId);
    gymList.set({stale: true}); // this will cause to refetch
    addGymCursor.set(['data'], post.body);
    addGymCursor.set(['response'], {'success': true, 'message': 'Your gym information has been successfully submitted!'});
  } catch (err) {
    update = null;
    addGymCursor.set(['response'], {'success': false, 'message': 'There was an error submitting your information.'});
  }
  addGymCursor.set(['awaitingSave'], false);
  tree.commit();
  return update;
}

export async function addPhotos(data, gymId) {
  let update;
  addGymCursor.set(['awaitingSave'], true);
  const dataStr = JSON.stringify(data);
  try {
    update = await addPhotosApi(dataStr, gymId);
    gymList.set({stale: true}); // this will cause to refetch
    addGymCursor.set(['data'], post.body);
    addGymCursor.set(['response'], {'success': true, 'message': 'Your gym information has been successfully submitted!'});
  } catch (err) {
    update = null;
    addGymCursor.set(['response'], {'success': false, 'message': 'There was an error submitting your information.'});
  }
  addGymCursor.set(['awaitingSave'], false);
  tree.commit();
  return update;
}