import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import {Link} from 'react-router';

class LocationHours extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <Col xs={12}>
        <h2>Hours</h2>
        {this.props.profile.hours ? 
          <div>
            <div>
              <span className="day-label">Monday:</span>
              { profile.hours.mon_open ?
                <div>{profile.hours.mon_open} - {profile.hours.mon_close}</div>
                : 'Closed'
              }
            </div>
            <div>
              <span className="day-label">Tuesday:</span>
              { profile.hours.tue_open ?
                <div>{profile.hours.tue_open} - {profile.hours.tue_close}</div>
                : 'Closed'
              }
            </div>
            <div>
              <span className="day-label">Wednesday:</span>
              { profile.hours.wed_open ?
                <div>{profile.hours.wed_open} - {profile.hours.wed_close}</div>
                : 'Closed'
              }
            </div>
            <div>
              <span className="day-label">Thursday:</span>
              { profile.hours.thu_open ?
                <div>{profile.hours.thu_open} - {profile.hours.thu_close}</div>
                : 'Closed'
              }
            </div>
            <div>
              <span className="day-label">Friday:</span>
              { profile.hours.fri_open ?
                <div>{profile.hours.fri_open} - {profile.hours.fri_close}</div>
                : 'Closed'
              }
            </div>
            <div>
              <span className="day-label">Saturday:</span>
              { profile.hours.sat_open ?
                <div>{profile.hours.sat_open} - {profile.hours.sat_close}</div>
                : 'Closed'
              }
            </div>
            <div>
              <span className="day-label">Sunday:</span>
              { profile.hours.sun_open ?
                <div>{profile.hours.sun_open} - {profile.hours.sun_open}</div>
                : 'Closed'
              }
            </div>
          </div>
          : <div>Your gym doesn't have any hours yet! Add some <Link to={`/add-gym/${profile._id}`}>here</Link></div> 
        }
        
      </Col>
    );
  }

}

export default LocationHours;
