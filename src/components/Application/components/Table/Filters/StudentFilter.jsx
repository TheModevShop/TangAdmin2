import React from 'react';
import Select from 'react-select';
import * as actions from 'actions/TableFilterActions';

const StudentFilter = React.createClass({
  render() {
    const students = this.props.students;
    return (
     <Select
       className=""
       name="form-field-name"
       options={students}
       value={this.props.value}
       onChange={this.onChange}
       placeholder="Students" />
    );
  },

  onChange(val) {
    actions.setStudent(val)
  }
});

export default StudentFilter;