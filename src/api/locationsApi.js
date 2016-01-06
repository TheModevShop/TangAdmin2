import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';


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

// POST - Creates new Gym (Needs admin auth)

// name - required
// description
// street - required
// state - required
// zipcode - required
// phone
// email