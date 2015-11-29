import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {getAuthentication} from 'actions/authenticationActions';
import history from 'appHistory';
import {Panel, Input, Button} from 'react-bootstrap';
import $ from 'jquery';
import formData from 'utility/formData';


class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const error = _.get(this.props, 'authentication.error');
    console.log(this.props.authentication)
    return (
      <div className="col-md-4 col-md-offset-4">
        {
          error ? 
          <div className="error">ERROR LOGGING IN</div> : null
        }
        <Panel header={<h3>Please Sign In</h3>} className="login-panel">
          <form role="form" onSubmit={this.submitForm}>
            <fieldset>
              <div className="form-group">
                <Input onChange={this.setLoginID} className="form-control" placeholder="Username" ref="loginID" type="text" autofocus="" name="email" />
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
    await getAuthentication(formData(e.target));
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
