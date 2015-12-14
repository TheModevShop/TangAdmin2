import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class LocationHours extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <Col xs={12}>
        <h2>Hours</h2>
        <div>
          <div>
            Monday:
            { profile.hours.mon_1_open ?
              <div>{profile.hours.mon_1_open} - {profile.hours.mon_1_close}</div>
              : Closed
            }
          </div>
          <div>
            Tuesday:
            { profile.hours.tue_1_open ?
              <div>{profile.hours.tue_1_open} - {profile.hours.tue_1_close}</div>
              : Closed
            }
          </div>
          <div>
            Wednesday:
            { profile.hours.wed_1_open ?
              <div>{profile.hours.wed_1_open} - {profile.hours.wed_1_close}</div>
              : Closed
            }
          </div>
          <div>
            Thursday:
            { profile.hours.thu_1_open ?
              <div>{profile.hours.thu_1_open} - {profile.hours.thu_1_close}</div>
              : Closed
            }
          </div>
          <div>
            Friday:
            { profile.hours.fri_1_open ?
              <div>{profile.hours.fri_1_open} - {profile.hours.fri_1_close}</div>
              : Closed
            }
          </div>
          <div>
            Saturday:
            { profile.hours.sat_1_open ?
              <div>{profile.hours.sat_1_open} - {profile.hours.sat_1_close}</div>
              : Closed
            }
          </div>
          <div>
            Sunday:
            { profile.hours.sun_1_open ?
              <div>{profile.hours.sun_1_open} - {profile.hours.sun_1_open}</div>
              : Closed
            }
          </div>
        </div>
      </Col>
    );
  }

}

export default LocationHours;
