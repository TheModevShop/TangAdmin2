import React from 'react';
import InputField from 'components/Application/components/Forms/InputField';
import {Row, Col, Button} from 'react-bootstrap';
import Formsy from 'formsy-react';
import {setDefaultLocation} from 'actions/UserActions';
import _ from 'lodash';

class ChangeGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      canSubmit: false
    }
  }

  render() {
    return (
      this.props.gyms && !_.get(this.props.gyms, 'isLoading') ?
      <ul className="change-gym">
        <h3>Change Default Gym</h3>
        {
          _.map(this.props.gyms, (gym) => {
            return (
              <li key={gym._id}>
                <div className="info">
                  <h4>{gym.gym.name}</h4>
                  <h5>{_.get(gym, 'gym.address.street')} {_.get(gym, 'gym.address.city')}</h5>
                </div>
                <div className="actions">
                  {
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
    setDefaultLocation(gymId)
  }


}

export default ChangeGym;
