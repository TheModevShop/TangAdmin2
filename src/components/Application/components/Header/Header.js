import React from 'react';
import {branch} from 'baobab-react/higher-order';
import Router, { Link, RouteHandler } from "react-router";
import {teardownSession} from 'actions/authenticationActions';
import _ from 'lodash';
import './header.less';

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const name = _.get(this.props, 'user.details.name', null);
    const user = _.get(this.props, 'user.details', {});
    const gym = _.get(this.props, 'user.myGym.gymDetails.name', null);
    const nameFormatted = name ? name.first +' '+name.last : null;
    return (
      <div className="app-header">
        <div className="icon-logo salmon"></div>
        <div className="current-user">
          <div className="title-group">
            <div className="name">{nameFormatted}</div>
            <div className="gym">{gym}</div>
          </div>
          <div className="img" style={{backgroundImage: "url('http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg')"}}></div>
          <div className="logout" onClick={this.logout}>Logout</div>
        </div>
      </div>
    );
  }
  logout() {
    teardownSession();
  }
}

Header.contextTypes = {
  history: React.PropTypes.object
};

export default branch(Header, {
  cursors: {
    user: ['user']
  }
});