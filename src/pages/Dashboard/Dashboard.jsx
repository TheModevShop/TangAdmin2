 import React from 'react';
import {branch} from 'baobab-react/higher-order';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import parseDate from 'utility/parseDate';
import {Link} from 'react-router';
import './dashboard.less';
import _ from 'lodash';

BigCalendar.momentLocalizer(moment);

class Dashboard extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {classes: []};
  }

  monthEvent({event}) {
    let start = moment(event.start).format('h:mm a');
    let end = moment(event.end).format('h:mm a');
    return (
      <div>
        <Link to={`/class-profile/${event.id}`}>{event.shortTitle}</Link>
      </div>
    );
  }

  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      let newClassItem = {};
      // let date = moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY');
      // let start = moment(classItem.time.start, 'H:mm').format('HH:mm');
      // let end = moment(classItem.time.end, 'H:mm').format('HH:mm');
      let enrolled = classItem.enrolled ? (classItem.enrolled[0] ? classItem.enrolled[0].name.first : 'N/A') : 'N/A';
      let instructor = classItem.instructor ? classItem.instructor.name.first : 'N/A';
      newClassItem.start = new Date(parseDate(classItem.date, classItem.time.start));
      newClassItem.end = new Date(parseDate(classItem.date, classItem.time.end));
      newClassItem.desc = classItem.description ? classItem.description : null;
      newClassItem.title = (classItem.private ? (instructor + ' - ' + enrolled) : classItem.name) + ', ' + moment(newClassItem.start).format('h:mm a') + ' - ' + moment(newClassItem.end).format('h:mm a');
      newClassItem.className = classItem.private ? 'private-session' : '';
      newClassItem.shortTitle = classItem.private ? (instructor + ' - ' + enrolled) : classItem.name;
      newClassItem.id = classItem._id;
      return newClassItem;
    });

    return classes;
  }

  setClassName(event, start, end, isSelected) {
    return {className: event.className, style: null};
  }

  render() {
    const classes = this.formatData(_.get(this.props, 'dashboard.allClasses') || []);
    return (

        <div className="dashboard">
          <BigCalendar
            events={classes}
            popup
            defaultDate={new Date()} 
            eventPropGetter={this.setClassName.bind(this)}
            components={{month:{event: this.monthEvent.bind(this)}, week:{event: this.monthEvent.bind(this)}, day:{event: this.monthEvent.bind(this)}}}
            views={['month', 'week', 'day']}
            formats={{dateFormat: 'D', dayFormat: 'dddd Do', weekHeaderFormat: 'MMMM D - D', dayHeaderFormat: 'MMMM D, YYYY'}}
          />
        </div>
    );
  }
}
export default branch(Dashboard, {
  facets: {
    dashboard: 'Dashboard'
  }
});
