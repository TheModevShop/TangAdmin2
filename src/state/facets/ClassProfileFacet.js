import _ from 'lodash';
import RESTLoader from '../loaders/RESTLoader';
import {BASE} from 'constants';

const loader = new RESTLoader({
  getResourceUrl: (id) => {
    return `${BASE}/gyms/${id}/sessions/${id}`;
  },
  successTransformer: (data) => {
    return {
      classProfile: data.body,
      locations: ['user', 'details', 'gyms'],
    };
  },
  errorTransformer: (err) => {
    return {
      sessions: [],
      error: err
    };
  }
});

export default function LocationScheduleFacet() {
  return {
    cursors: {
      classes: ['views', 'ClassList'],
      myGym: ['user', 'myGym']
    },
    get(data) {
      const id = window.location.href.split('/').pop();
      
      if (data.classProfile && data.classProfile.stale) {
        loader.invalidateCache();
      }
      if (!loader.cursor) {
        loader.setCursor(this.cursors.classProfile);
      }
      const classProfile = _.clone(loader.fetch(_.get(data.myGym, 'gymDetails._id')));
      return classProfile
    }
  };
};

