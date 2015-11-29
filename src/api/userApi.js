import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function editUser(data) {
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/me`, data).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function getUser() { 
  return new bluebird((resolve, reject) => {
    xhr('GET', `${BASE}/me`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}