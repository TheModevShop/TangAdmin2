import React from 'react';
import {branch} from 'baobab-react/higher-order';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
        <span>{event.shortTitle}</span>
      </div>
     
    )
  }

  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      let newClassItem = {};
      let date = moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY');
      let start = moment(classItem.time.start, 'H:mm').format('HH:mm');
      let end = moment(classItem.time.end, 'H:mm').format('HH:mm');
      let enrolled = classItem.enrolled ? (classItem.enrolled[0] ? classItem.enrolled[0].name.first : 'N/A') : 'N/A';
      let instructor = classItem.instructor ? classItem.instructor.name.first : 'N/A';
      newClassItem.start = new Date(moment(classItem.date + ' ' + classItem.time.start).format('YYYY-MM-DD HH:mm'));
      newClassItem.end = new Date(moment(classItem.date + ' ' + classItem.time.end).format('YYYY-MM-DD HH:mm'));
      newClassItem.desc = classItem.description ? classItem.description : null;
      newClassItem.title = (classItem.private ? (instructor + ' - ' + enrolled) : classItem.name) + ', ' + moment(newClassItem.start).format('h:mm a') + ' - ' + moment(newClassItem.end).format('h:mm a');
      newClassItem.className = classItem.private ? 'private-session' : '';
      newClassItem.shortTitle = classItem.private ? (instructor + ' - ' + enrolled) : classItem.name;
      return newClassItem;
    });

    return classes;
  }

  setClassName(event, start, end, isSelected) {
    return {className: event.className, style: null};
  }

  render() {
    const privates = _.get(this.props, 'privates.allPrivates') || [];
    const classes = _.get(this.props, 'classes.allClasses') || [];
    const classArray = this.formatData(_.concat(privates, classes));
    console.log(classArray);
    return (

        <div className="dashboard">
          <BigCalendar
            events={classArray}
            popup
            defaultDate={new Date()} 
            eventPropGetter={this.setClassName.bind(this)}
            components={{month:{event: this.monthEvent.bind(this), popup: this.monthEvent.bind(this)}}}
            views={['month', 'week', 'day']}
            formats={{
                      dateFormat: 'D',
                      dayFormat: 'dddd Do',
                      weekHeaderFormat: 'MMMM D - D',
                      dayHeaderFormat: 'MMMM D, YYYY',
                    }}
                      />
        </div>
    );
  }
}
export default branch(Dashboard, {
  cursors: {
    dashboard: ['dashboard']
  },
  facets: {
    classes: 'Classes',
    privates: 'Privates'
  }
});
