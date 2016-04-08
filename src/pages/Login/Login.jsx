import React from 'react';
import {Link} from 'react-router';
import {branch} from 'baobab-react/higher-order';
import {getAuthentication} from 'actions/authenticationActions';
import {Button} from 'react-bootstrap';
import InputField from 'components/Application/components/Forms/InputField';
import formData from 'utility/formData';
import './login.less';


class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      canSubmit: false
    }
  }

  render() {
    const error = _.get(this.props, 'authentication.error');
    return (
      <div className="login-wrapper">
        <div className="icon-logo"></div>
        <Formsy.Form role="form" ref="form" onValidSubmit={this.submitForm} onInvalidSubmit={this.notifyFormError} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
            <h2 className="light">Sign Into Tang Admin</h2>
            <fieldset>
              <InputField 
                placeholder="Email Address"
                ref="loginID"
                type="text"
                autofocus=""
                name="email"
                required />
              <InputField
                placeholder="Password" 
                ref="password" 
                type="password" 
                name="password" 
                required />
              <Button bsSize="large" type="submit" value="Submit" disabled={!this.state.canSubmit} block>Login</Button>
              {
                error ? 
                <div className="error">Error Signing In</div> : null
              }  
            </fieldset>
          </Formsy.Form>
          <footer>
            <h3><Link to={`/forgot-password`}>Forgot Password?</Link></h3>
          </footer>
      </div>
    );
  }

  async submitForm(data) {
    await getAuthentication(data);
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
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
