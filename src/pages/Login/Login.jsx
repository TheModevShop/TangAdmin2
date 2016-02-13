import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {getAuthentication} from 'actions/authenticationActions';
import history from 'appHistory';
import {Panel, Input, Button} from 'react-bootstrap';
import $ from 'jquery';
import formData from 'utility/formData';
import './login.less';


class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const error = _.get(this.props, 'authentication.error');
    return (
      <div className="login-wrapper">
        <form role="form" onSubmit={this.submitForm}>
            <fieldset>
              <div className="form-group">
                <Input onChange={this.setLoginID} className="form-control" placeholder="Username" ref="loginID" type="text" autofocus="" name="email" />
              </div>

              <div className="form-group">
                <Input onChange={this.setPassword} className="form-control" placeholder="Password" ref="password" type="password" name="password" />
              </div>
              <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
              
            </fieldset>
          </form>   
          {
            error ? 
            <div className="error">Error Signing In</div> : null
          }     
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
