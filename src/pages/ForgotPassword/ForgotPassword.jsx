import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {requestPasswordReset} from 'actions/authenticationActions';
import {Link} from 'react-router';
import history from 'appHistory';
import {Panel, Input, Button} from 'react-bootstrap';
import $ from 'jquery';
import formData from 'utility/formData';
import './forgot-password.less';


class ForgotPassword extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const error = this.state.error;
    return (
      <div className="forgot-password-wrapper">
        <div className="icon-logo"></div>

        {
          this.state.success ? 
          <section className="success">
            <h2>Great, Thanks.</h2>
            <h3>An email will be sent shortly.</h3>
          </section> :

          <form role="form" onSubmit={this.submitForm.bind(this)}>
              <h2 className="light">Forgot Password</h2>
              <fieldset>
                <div className="form-group">
                  <Input onChange={this.setLoginID} className="form-control" placeholder="Email" ref="loginID" type="text" autofocus="" name="email" />
                </div>

                <Button type="submit" bsSize="large" block>Submit Email</Button>
                {
                  error ? 
                  <div className="error">Error Submitting Email</div> : null
                }  
              </fieldset>
            </form>
          }

          <footer>
            <h3><Link to={`/login`}>Back to Login</Link></h3>
          </footer>
      </div>
    );
  }

  goToLogin() {
    history.pushState(null, '/login');
  }

  async submitForm(e) {
    e.preventDefault();
    this.setState({loading: true});
    const response = await requestPasswordReset(formData(e.target).email);
    if (response) {
      this.setState({success: true, error: false});  
    } else {
      this.setState({error: true, success: false});  
    }
    this.setState({loading: false});
  }
}


export default ForgotPassword;
