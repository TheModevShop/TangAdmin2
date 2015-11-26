import React from 'react';
import {branch} from 'baobab-react/higher-order';

class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
        <div className="dahboard-home">hello</div>
    );
  }
}
export default branch(Dashboard, {
  cursors: {
    dashboard: ['dashboard']
  }
});
