import React from 'react';
import Select from 'react-select';
import * as actions from 'actions/TableFilterActions';

const InstructorFilter = React.createClass({
  shouldComponentUpdate(next, current) {
    return current ? true : false;
  },

  render() {
    const instructors = this.props.instructors;
    return (
     <Select
       className=""
       name="form-field-name"
       options={instructors}
       onChange={this.onChange}
       placeholder="Instructors" />
    );
  },

  onChange(val) {
    actions.setInstructor(val)
  }
});

export default InstructorFilter;