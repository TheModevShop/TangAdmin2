import tree from 'state/StateTree';
import {getMyGymApi, postGym} from 'api/locationsApi';
const activeGym = tree.select(['views', 'GymProfile']);
const GymList = tree.select(['views', 'GymList']);
const AddGym = tree.select(['views', 'AddGym']);
const MyGym = tree.select(['user', 'myGym']);

export function setActiveGym() {
  activeGym.set({stale: true});
  tree.commit();
}

export async function getMyGym(id) {
  MyGym.set({isLoading: true});
  try {
    const location = await getMyGymApi(id);
    MyGym.set('gymDetails', location.body);
    return location.body;
  } catch (err) {
    MyGym.set('error', err);
  }
  MyGym.set('isLoading', false);
  tree.commit();
  MyGym.get();
}

export async function addGym(data) {
  AddGym.set(['awaitingSave'], true);
  try {
    const post = await postGym(data);
    GymList.set('stale', true); // this will cause to refetch
    AddGym.set(['response'], {'success': true, 'message': 'Your gym information has been successfully submitted!'});
  } catch (err) {
    AddGym.set(['response'], {'success': false, 'message': 'There was an error submitting your information.'});
  }
  AddGym.set(['awaitingSave'], false);
  tree.commit();
}