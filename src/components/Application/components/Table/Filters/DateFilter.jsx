import React from 'react';
import Select from 'react-select';

const DateFilter = React.createClass({
  render() {
    const dates = this.props.dates;
    const onChange = this.props.onChange;
    return (
     <Select
       className=""
       name="form-field-name"
       options={dates}
       onChange={onChange}
       placeholder="Dates" />
    );
  }
});

export default DateFilter;