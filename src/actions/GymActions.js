import tree from 'state/StateTree';
import {getMyGymApi} from 'api/locationsApi';
const activeGym = tree.select(['views', 'GymProfile']);
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