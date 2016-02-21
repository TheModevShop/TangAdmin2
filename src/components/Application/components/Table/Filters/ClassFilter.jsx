import React from 'react';
import Select from 'react-select';

const ClassFilter = React.createClass({
  render() {
    const classes = this.props.classes;
    const onChange = this.props.onChange;
    return (
     <Select
       className=""
       name="form-field-name"
       options={classes}
       onChange={onChange}
       placeholder="Classes" />
    );
  }
});

export default ClassFilter;