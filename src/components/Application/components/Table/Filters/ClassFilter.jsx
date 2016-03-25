import React from 'react';
import tree from 'state/StateTree';
import Select from 'react-select';
import * as actions from 'actions/TableFilterActions';

const ClassFilter = React.createClass({
  render() {
    const classes = this.props.classes;
    return (
     <Select
       className=""
       name="form-field-name"
       options={classes}
       value={this.props.value}
       onChange={this.onChange}
       placeholder="Classes" />
    );
  },

  onChange(val) {    
    actions.setClassName(val, this.props.table)
  }
});

export default ClassFilter;