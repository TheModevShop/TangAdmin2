import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/sessions?private=true&onlyEnrolled=true`;
  },
  successTransformer: (data) => {
    return {
      allPrivates: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function PrivatesFacet() {
  return {
    cursors: {
      privates: ['views', 'PrivatesList'],
      myGym: ['user', 'myGym']
    },
    get(data) {
      if (data.privates && data.privates.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.privates);
      }
      const privates = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id')));
      return privates
    }
  };
};

