import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function postClass(id, data) { 
  console.log(data)
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/gyms/${id}/sessions`, {data: data}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}
