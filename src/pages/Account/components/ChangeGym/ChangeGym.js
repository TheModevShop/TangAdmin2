import React from 'react';
import InputField from 'components/Application/components/Forms/InputField';
import {Row, Col, Button} from 'react-bootstrap';
import Formsy from 'formsy-react';
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
      this.props.gyms ?
      <ul className="change-gym">
        <h3>My Gyms</h3>
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
                    gym.gym.default ?
                    <h4>Default</h4> :
                    <h4 className="primary-link">Make Default</h4>
                  }
                </div>
              </li>
            );
          })
        }
      </ul> : null
      
    );
  }


  async submit(btn) {
    const data = this.refs.form.model;
    console.log(data)
  }


}

export default ChangeGym;
