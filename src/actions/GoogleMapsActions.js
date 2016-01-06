import tree from 'state/StateTree';
import geocoder from 'google-geocoder';
import BluebirdPromise from 'bluebird';

const geo = geocoder({
  key: 'AIzaSyBaVfqKXcfhWip1siLUKSO7512qXNUqp5U'
});
 

export async function getGymGeoPoints(address) {
  return new BluebirdPromise((resolve, reject) => {
    geo.find(address, (err, res) => { 
      if (err) {
        reject(err);
      } else {
        resolve(res);
      } 
    });
  });
}


