import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {signIn} from 'actions/authenticationActions';
import history from 'appHistory';


class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps || !nextProps.authentication) {
      return;
    }
    const sessionData = nextProps.authentication.sessionData;
    if (sessionData && !_.get(this.context.router, 'state.isTransitioning')) {
      const screen = _.get(nextProps, 'authentication.sessionData.user');
      history.pushState(null, screen);
    }
  }

  render() {
    return (
      <div onClick={this.submitForm.bind(this)}>fsadhfjkasfhsk</div>
    );
  }

  async submitForm(e) {
    e.preventDefault();
    console.log('hello')
    await signIn(e);
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default branch(Login, {
  cursors: {
    authentication: 'authentication',
    awaitingAuthentication: 'awaitingAuthentication'
  }
});
