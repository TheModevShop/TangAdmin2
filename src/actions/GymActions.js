import tree from 'state/StateTree';
import {getMyGymApi, postGym} from 'api/locationsApi';
const activeGym = tree.select(['views', 'GymProfile']);
const gymList = tree.select(['views', 'GymList']);
const myGym = tree.select(['user', 'myGym']);

export function setActiveGym() {
  activeGym.set({stale: true});
  tree.commit();
}


export async function getMyGym(id) {
  myGym.set({isLoading: true});
  try {
    const location = await getMyGymApi(id);
    myGym.set('gymDetails', location.body);
  } catch (err) {
    myGym.set('error', err);
  }
  myGym.set('isLoading', false);
  tree.commit();
  myGym.get();
}

export async function addGym(data) {
  gymList.set({isLoading: true});
  try {
    const post = await postGym(data);
    gymList.set('stale', true); // this will cause to refetch
  } catch (err) {
    gymList.set('error', err);
  }
  myGym.set('isLoading', false);
  tree.commit();
}