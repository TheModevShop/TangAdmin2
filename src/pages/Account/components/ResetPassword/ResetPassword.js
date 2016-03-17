import React from 'react';
import InputField from 'components/Application/components/Forms/InputField';
import Spinner from 'components/Spinner';
import {Row, Col, Button} from 'react-bootstrap';
import Formsy from 'formsy-react';
import _ from 'lodash';

class ResetPassword extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      canSubmit: false
    }
  }

  render() {
    const data = this.props.data || {};
    return (
      <Formsy.Form ref="form" onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
         <Col xs={12}>
            <Row>
              <InputField 
                className="col-xs-12 new-password" 
                name="password" 
                title="New Password"
                type="password"
                required />
              <InputField 
                className="col-xs-12 confirm-new-password" 
                name="password-confirmation" 
                title="Confirm Password"
                type="password"
                validations="equalsField:password"
                validationError="Passwords Do not match!"
                required />
            </Row>

            <Button type="submit" value="Submit" disabled={!this.state.canSubmit}>
              {
                this.props.loading ?
                <Spinner className={'button-spinner'} /> :
                'Change Password'
              }
            </Button>
          </Col>
          
      </Formsy.Form>
    );
  }


  async submit(btn) {
    const data = this.refs.form.model;
    if (new RegExp('(?=.{6,}).*', 'g').test(data.password)) {
      this.props.submitPassword({password: data.password})
    } else {
      alert('Your password must be atleast 6 letters');
    }
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

}

export default ResetPassword;
