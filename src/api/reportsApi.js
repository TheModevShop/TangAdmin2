import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function getGymOwnerReports(id, data) { 

  return new bluebird((resolve, reject) => {
    xhr('GET', `${BASE}/gyms/${id}/run-instructor-report?startDate=${data.startDate}&endDate=${data.endDate}`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function getAppOwnerReports(data) { 
  return new bluebird((resolve, reject) => {
    xhr('GET', `${BASE}/admin/app-owner-report?limit=1000000&startDate=${data.startDate}&endDate=${data.endDate}`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}