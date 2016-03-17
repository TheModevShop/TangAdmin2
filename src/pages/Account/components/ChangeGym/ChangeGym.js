import React from 'react';
import Spinner from 'components/Spinner';
import InputField from 'components/Application/components/Forms/InputField';
import {Row, Col, Button} from 'react-bootstrap';
import Formsy from 'formsy-react';
import {setDefaultLocation} from 'actions/UserActions';
import _ from 'lodash';

class ChangeGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      this.props.gyms && _.get(this.props, 'gyms.list.length') ?
      <ul className="change-gym">
        <h3>Change Default Gym</h3>
        {
          _.map(this.props.gyms.list, (gym) => {
            return (
              <li key={gym._id}>
                <div className="info">
                  <h4>{gym.gym.name}</h4>
                  <h5>{_.get(gym, 'gym.address.street')} {_.get(gym, 'gym.address.city')}</h5>
                </div>
                <div className="actions">
                  {
                    this.state.loading === gym._id ?
                    <Spinner className={'button-spinner'} /> :
                    gym.default ?
                    <h4>Default</h4> :
                    <h4 onClick={this.setDefaultLocation.bind(this, gym.gym._id)} className="primary-link">Make Default</h4>
                  }
                </div>
              </li>
            );
          })
        }
      </ul> : null
      
    );
  }

  async setDefaultLocation(gymId) {
    this.setState({loading: gymId});
    await setDefaultLocation(gymId);
    this.setState({loading: false});

  }


}

export default ChangeGym;
