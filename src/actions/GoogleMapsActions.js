import tree from 'state/StateTree';
import geocoder from 'google-geocoder';
import BluebirdPromise from 'bluebird';
import _ from 'lodash';

const geo = geocoder({
  key: 'AIzaSyBNfnzxRTDyHuR7Ws5tncjX5JN0hz5OMss'
});
 

export async function getGymGeoPoints(address) {
  return new BluebirdPromise((resolve, reject) => {
    geo.find(address, (err, res) => { 
      if (err) {
        reject(err);
      } else {
        resolve(_.get(res, '[0].location'));
      } 
    });
  });
}


