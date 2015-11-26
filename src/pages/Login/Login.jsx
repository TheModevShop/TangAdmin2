import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {signIn} from 'actions/authenticationActions';
import history from 'appHistory';
import {Panel, Input, Button} from 'react-bootstrap';


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
      <div className="col-md-4 col-md-offset-4">

        <Panel header={<h3>Please Sign In</h3>} className="login-panel">
          <form role="form" onSubmit={this.submitForm}>
            <fieldset>
              <div className="form-group">
                <Input onChange={this.setLoginID} className="form-control" placeholder="Username" ref="loginID" type="text" autofocus="" name="name" />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>
              <Input type="checkbox" label="Remember Me" />
              <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
              
            </fieldset>
          </form>

        </Panel>
        
      </div>
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
