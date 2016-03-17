import React from 'react';
import Spinner from 'components/Spinner';
import InputField from 'components/Application/components/Forms/InputField';
import {Row, Col, Button} from 'react-bootstrap';
import _ from 'lodash';

class ChangeEmail extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      canSubmit: false
    }
  }

  render() {
    return (
      <Formsy.Form ref="form" onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
         <Col xs={12}>
            <Row>
              <InputField 
                className="col-xs-12 email" 
                name="email"
                value={this.props.email}
                onChangeCallback={this.onChangeCallback.bind(this)}
                title="Email Address"   
                validations="isEmail"
                required />
            </Row>

            <Button type="submit" value="Submit" disabled={!this.state.canSubmit || this.state.newValue === this.props.email || !this.state.newValue}>
              {
                this.props.loading ?
                <Spinner className={'button-spinner'} /> :
                'Change Email'
              }
            </Button>
          </Col>
          
      </Formsy.Form>
    );
  }

  onChangeCallback(e) {
    const value = e.currentTarget.value
    this.setState({newValue: value})
  }

  async submit(data) {
    this.props.submitEmail(data);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

}

export default ChangeEmail;
