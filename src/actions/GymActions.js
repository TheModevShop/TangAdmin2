import tree from 'state/StateTree';
import {getMyGymApi} from 'api/locationsApi';
const activeGym = tree.select(['views', 'GymProfile']);
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