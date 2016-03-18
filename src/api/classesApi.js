import bluebird from 'bluebird';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

export async function postClass(id, data) { 
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/gyms/${id}/sessions`, {data: data}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function cancelClassApi(ids) { 
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/me/classes/cancel`, {sessions: ids}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function completeClassApi(sessionId, gymId) { 
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/gyms/${gymId}/sessions/${sessionId}/complete`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function putClass(gymId, classId, data) { 
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/gyms/${gymId}/sessions/${classId}`, {data: data}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function removeUserFromSessionApi(gymId, sessionId, userId) { 
  return new bluebird((resolve, reject) => {
    xhr('PUT', `${BASE}/gyms/${gymId}/sessions/${sessionId}/remove-user`, {enrolled: JSON.stringify([userId])}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}
