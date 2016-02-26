import React from 'react';
import Select from 'react-select';

const InstructorFilter = React.createClass({
  shouldComponentUpdate(next, current) {
    return current ? true : false;
  },
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