import React from 'react';
import {Row, Col, Input} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import Spinner from 'components/Spinner';
import ChangeEmail from './components/ChangeEmail';
import ResetPassword from './components/ResetPassword';
import ChangeGym from './components/ChangeGym';
import {editMe} from 'actions/UserActions';
import _ from 'lodash';
import './account.less';

class Account extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <div className="account-wrapper">
        <h1>Account Settings</h1>

        <div className="email card">
          <ChangeEmail submitEmail={this.submitEmail.bind(this)} email={_.get(this.props, 'user.details.email', '')} />
        </div>

        <div className="password card">
          <ResetPassword submitPassword={this.submitPassword.bind(this)}/>
        </div>

        <div className="change-primary-gym card">
          <ChangeGym gyms={_.get(this.props, 'gyms')} changeGym={this.changeGym.bind(this)}/>
        </div>
      </div>
    );
  }
  
  async submitEmail(data) {
    await editMe(data);
    alert('success')
  }

  async changeGym(data) {
    console.log(data)
  }

  submitPassword(data) {
    console.log(data)
  }
}

export default branch(Account, {
  cursors: {
    user: ['user']
  },
  facets: {
    gyms: 'MyGyms'
  }
});
