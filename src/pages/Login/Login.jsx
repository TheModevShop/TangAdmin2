import React from 'react';
import {branch} from 'baobab-react/higher-order';
import SignInForm from './components/SignInForm';


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
      this.context.router.transitionTo(screen);
    }
  }

  render() {
    return (
      <div>fsadhfjkasfhsk</div>
    );
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
