import React from 'react';
import history from 'appHistory';
import './side-bar.less';

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <nav className="nav-bar">
      </nav>
    );
  }

  goHome() {
    history.pushState(null, '/');
  }

}

Header.contextTypes = {
  history: React.PropTypes.object
};

export default Header;