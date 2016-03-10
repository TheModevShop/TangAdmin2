import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';
import moment from 'moment';

// Gets all classes provided at gym

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    let startDate = moment().format('YYYYMMDD');
    let endDate = moment().add(12, 'months').format('YYYYMMDD');
    return `${BASE}/gyms/${id}/sessions/classes?startDate=${startDate}&endDate=${endDate}`;
  },
  successTransformer: (data) => {
    return {
      classes: data.body
    };
  },
  errorTransformer: (err) => {
    return {      
      error: err
    };
  }
});

export default function GymClassesNameFacet() {
  return {
    cursors: {
      location: ['locationDetails'],
      locationClassNames: ['locationClassNames'],
      myGym: ['user', 'myGym']
    },
    get(data) {
      const myGymId = _.get(data, 'myGym.gymDetails._id');
      
      if (data.locationClassNames && data.locationClassNames.stale) {
        loader.invalidateCache();
      }
      
      if (!loader.cursor) {
        loader.setCursor(this.cursors.locationClassNames);
      }
      
      const classes = _.clone(loader.fetch(myGymId));
      return classes
    }
  };
}