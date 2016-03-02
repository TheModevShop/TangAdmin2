import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/owners`;
  },
  successTransformer: (data) => {
    return {
      gymOwners: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function gymOwnersFacet() {
  return {
    cursors: {
      gymOwners: ['views', 'GymOwners'],
      myGym: ['user', 'myGym']
    },
    get(data) {
      if (data.gymOwners && data.gymOwners.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.gymOwners);
      }
      // when we want to initiate a query we might need to add a search button to then set stale on the table to it refetches with new params
      const gymOwners = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id')));
      return gymOwners
    }
  };
};

