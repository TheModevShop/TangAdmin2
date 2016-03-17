import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: () => {
    return `${BASE}/me/get-gyms`;
  },
  successTransformer: (data) => {
    return {
     list: _.get(data.body, 'gyms') || []
    }
  }  
});

export default function MyGymsFacet() {
  return {
    cursors: {
      myGyms: ['user', 'myGyms'],
    },
    get(data) {
      if (data.myGyms && data.myGyms.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.myGyms);
      }
      const myGyms = _.clone(loader.fetch());
      return myGyms
    }
  };
};

