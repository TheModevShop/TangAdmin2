import React from 'react';
import Select from 'react-select';
import * as actions from 'actions/TableFilterActions';

const DateFilter = React.createClass({
  shouldComponentUpdate(next, current) {
    return current ? true : false;
  },
  render() {
    const dates = this.props.dates;
    return (
     <Select
       className=""
       name="form-field-name"
       options={dates}
       onChange={this.onChange}
       placeholder="Dates" />
    );
  },
  onChange(e) {
    actions.setInstructor()
  }
});

export default DateFilter;