import React from 'react';
import {branch} from 'baobab-react/higher-order';

class GymsProfile extends React.Component {
  render() {
    return (
      <div>
        Gym INfo HERE
       </div>
    );
  }
}

export default branch(GymsProfile, {
  facets: {
    gyms: 'GymProfile'
  }
});
