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