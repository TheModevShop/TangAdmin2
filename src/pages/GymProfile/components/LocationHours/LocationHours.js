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
            <span className="day-label">Monday:</span>
            { profile.hours.mon_1_open ?
              <div>{profile.hours.mon_1_open} - {profile.hours.mon_1_close}</div>
              : Closed
            }
          </div>
          <div>
            <span className="day-label">Tuesday:</span>
            { profile.hours.tue_1_open ?
              <div>{profile.hours.tue_1_open} - {profile.hours.tue_1_close}</div>
              : Closed
            }
          </div>
          <div>
            <span className="day-label">Wednesday:</span>
            { profile.hours.wed_1_open ?
              <div>{profile.hours.wed_1_open} - {profile.hours.wed_1_close}</div>
              : Closed
            }
          </div>
          <div>
            <span className="day-label">Thursday:</span>
            { profile.hours.thu_1_open ?
              <div>{profile.hours.thu_1_open} - {profile.hours.thu_1_close}</div>
              : Closed
            }
          </div>
          <div>
            <span className="day-label">Friday:</span>
            { profile.hours.fri_1_open ?
              <div>{profile.hours.fri_1_open} - {profile.hours.fri_1_close}</div>
              : Closed
            }
          </div>
          <div>
            <span className="day-label">Saturday:</span>
            { profile.hours.sat_1_open ?
              <div>{profile.hours.sat_1_open} - {profile.hours.sat_1_close}</div>
              : Closed
            }
          </div>
          <div>
            <span className="day-label">Sunday:</span>
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
