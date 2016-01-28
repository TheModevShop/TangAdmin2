import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import tree from 'state/StateTree';
import {BASE} from '../constants';

const gym = tree;

export function getMyGymApi(id) {
  return new bluebird((resolve, reject) => {
    xhr('GET', `${BASE}/gyms/${id}`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function postGym(data) { 
  console.log(data)
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/gyms`, {data: data}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function postGymUpdate(data, id) { 
  console.log(data)
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/gyms/${id}`, {data: data}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

// POST - Creates new Gym (Needs admin auth)

// name - required
// description
// street - required
// state - required
// zipcode - required
// phone
// email