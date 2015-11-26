import React from 'react';
import history from 'appHistory';
import './header.less';

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <header className="app-header"></header>
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