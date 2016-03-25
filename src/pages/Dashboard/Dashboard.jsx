 import React from 'react';
import {branch} from 'baobab-react/higher-order';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import parseDate from 'utility/parseDate';
import Spinner from 'components/Spinner';
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
    return (
      <div>
        <Link to={`/class-profile/${event.id}`}>{event.shortTitle}</Link>
      </div>
    );
  }

  weekEvent({event}) {
    return (
      <div className={event.duration < 45 ? 'hide-content' : ''}>
        <Link to={`/class-profile/${event.id}`}>{event.shortTitle}</Link>
      </div>
    );
  }


  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      let newClassItem = {};
      let enrolled = classItem.enrolled ? (classItem.enrolled[0] ? classItem.enrolled[0].name.first : 'N/A') : 'N/A';
      let instructor = classItem.instructor ? classItem.instructor.name.first : 'N/A';
      let pastDate = moment().format('YYYYMMDD') > Number(classItem.date);
      let issue = pastDate && (!classItem.complete || !_.get(classItem, 'sessionTransactions.passing'))
      
      newClassItem.start = new Date(parseDate(classItem.date, classItem.time.start));
      newClassItem.end = new Date(parseDate(classItem.date, classItem.time.end));
      newClassItem.desc = classItem.description ? classItem.description : null;
      newClassItem.title = (classItem.private ? (instructor + ' - ' + enrolled) : classItem.name) + ', ' + moment(newClassItem.start).format('h:mma') + ' - ' + moment(newClassItem.end).format('h:mma');
      newClassItem.className = (classItem.private ? 'private-session ' : '') + (pastDate ? 'past-date ' : '') + (issue ? 'issue' : '');
      newClassItem.shortTitle = classItem.private ? (instructor + ' - ' + enrolled) : classItem.name;
      newClassItem.id = classItem._id;
      newClassItem.duration = moment.duration(classItem.time.end).asMinutes() - moment.duration(classItem.time.start).asMinutes();
      return newClassItem;
    });

    return classes;
  }

  setClassName(event, start, end, isSelected) {
    return {className: event.className, style: null};
  }

  render() {
    const classes = this.formatData(_.get(this.props, 'dashboard.allClasses') || []);
    const isLoading = _.get(this.props, 'dashboard.isLoading', null)
    return (
        <div className="dashboard">
          {
            isLoading ? 
            <Spinner /> :
            <BigCalendar
              events={classes}
              popup
              defaultDate={new Date()} 
              eventPropGetter={this.setClassName.bind(this)}
              components={{month:{event: this.monthEvent.bind(this)}, week:{event: this.weekEvent.bind(this)}, day:{event: this.monthEvent.bind(this)}}}
              views={['month', 'week', 'day']}
              formats={{dateFormat: 'D', dayFormat: 'ddd Do', weekHeaderFormat: 'MMMM D - D', dayHeaderFormat: 'MMMM D, YYYY'}}
            />
          }
        </div>
    );
  }
}
export default branch(Dashboard, {
  facets: {
    dashboard: 'Dashboard'
  }
});
