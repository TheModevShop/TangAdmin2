import React from 'react';
import Select from 'react-select';

const StudentFilter = React.createClass({
  render() {
    const students = this.props.students;
    const onChange = this.props.onChange;
    return (
     <Select
       className=""
       name="form-field-name"
       options={students}
       onChange={onChange}
       placeholder="Students" />
    );
  }
});

export default StudentFilter;