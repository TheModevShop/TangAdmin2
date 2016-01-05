import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function postClass(data) { 
  console.log(data)
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/gyms`, {data}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}
