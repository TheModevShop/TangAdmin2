import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import moment from 'moment';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (gymId, transId) => {
    return `${BASE}/gyms/${gymId}/transactions/${transId}`;
  },
  successTransformer: (data) => {
    return {
      profile: data.body
    };
  },
  errorTransformer: (err) => {
    return {
      error: err
    };
  }
});

export default function TransactionProfileFacet() {
  return {
    cursors: {
      TransactionProfile: ['views', 'TransactionProfile', 'activeTransaction'],
      myGym: ['user', 'myGym'],
    },
    get(data) {
      const gymId = _.get(data.myGym, 'gymDetails._id');
      const id = window.location.href.split('/').pop();
      
      if (data.TransactionProfile && data.TransactionProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.TransactionProfile);
      }
      const TransactionProfile = _.clone(loader.fetch(gymId, id));
      return TransactionProfile;
    }
  };
};

