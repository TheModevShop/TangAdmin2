import React from 'react';
import Select from 'react-select';
import * as actions from 'actions/TableFilterActions';

const StudentFilter = React.createClass({
  shouldComponentUpdate(nextProps) {
    return nextProps.table !== this.props.table;
  },
  render() {
    const students = this.props.students;
    return (
     <Select
       className=""
       name="form-field-name"
       options={students}
       onChange={this.onChange}
       placeholder="Students" />
    );
  },

  onChange(e) {
    actions.setStudent()
  }
});

export default StudentFilter;