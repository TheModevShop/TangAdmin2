import React from 'react';
import Select from 'react-select';

const InstructorFilter = React.createClass({
  render() {
    const instructors = this.props.instructors;
    const onChange = this.props.onChange;
    return (
     <Select
       className=""
       name="form-field-name"
       options={instructors}
       onChange={onChange}
       placeholder="Instructors" />
    );
  }
});

export default InstructorFilter;