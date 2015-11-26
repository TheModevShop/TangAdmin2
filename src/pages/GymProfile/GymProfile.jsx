import React from 'react';
import {branch} from 'baobab-react/higher-order';

class GymProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
        <div className="gym-profile">
          gym profile
        </div>
    );
  }

}

export default branch(GymProfile, {
  cursors: {
    gymProfile: ['gymProfile']
  }
});
