import React from 'react';
import tree from 'state/StateTree';
import Select from 'react-select';
import * as actions from 'actions/TableFilterActions';

const ClassFilter = React.createClass({
  shouldComponentUpdate(nextProps) {
    return nextProps.table !== this.props.table;
  },
  render() {
    const classes = this.props.classes;
    return (
     <Select
       className=""
       name="form-field-name"
       options={classes}
       onChange={this.onChange}
       placeholder="Classes" />
    );
  },

  onChange(e) {
    actions.setClassName()
  }
});

export default ClassFilter;