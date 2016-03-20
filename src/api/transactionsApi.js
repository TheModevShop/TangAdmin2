import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function refundTransaction(id, gymId) {
console.log(id, gymId) 
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/gyms/${gymId}/transactions/${id}/refund`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export function retryChargeApi(transactionId, gymId, userId) {
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/gyms/${gymId}/transactions/${transactionId}`, {userId: userId}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}