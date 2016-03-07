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

  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      let newClassItem = {};
      let date = moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY');
      let start = moment(classItem.time.start, 'H:mm').format('HH:mm');
      let end = moment(classItem.time.end, 'H:mm').format('HH:mm');
      newClassItem.start = new Date(moment(classItem.date + ' ' + classItem.time.start).format('YYYY-MM-DD HH:mm'));
      newClassItem.end = new Date(moment(classItem.date + ' ' + classItem.time.end).format('YYYY-MM-DD HH:mm'));
      newClassItem.desc = classItem.description ? classItem.description : null;
      newClassItem.title = classItem.name ? classItem.name : classItem.instructor ? classItem.instructor.name.first + ' ' + classItem.instructor.name.last : 'N/A';
      return newClassItem;
    });

    return classes;
  }

  setClassName(event, start, end, isSelected) {
    return {className: event.title.replace(/\s+/g, '-').toLowerCase(), style: null};
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
            defaultDate={new Date()} 
            eventPropGetter={this.setClassName.bind(this)}/>
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
