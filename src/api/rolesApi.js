import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function addRole(data) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/roles`, data).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function getRolesRequest() { 
  return new bluebird((resolve, reject) => {
    xhr('GET', `${BASE}/roles`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}