import React from 'react';
import _ from 'lodash';
import formsy from 'formsy-react';
import {Tooltip} from 'react-bootstrap';

const SelectField = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group ' + (this.props.className || ' ') + (this.showRequired() ? 'required ' : this.showError() ? 'error ' : null);
    const errorMessage = this.getErrorMessage();
    const optionsList = _.map(this.props.options.data, (option) => {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      );
    });

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <Tooltip className={errorMessage ? "in validation-error" : "validation-error" } placement="top" >
          {errorMessage}
        </Tooltip>
        <select
          className="form-control"
          name={this.props.name}
          onChange={this.changeValue}
          onBlur={this.checkBlur}
          value={this.getValue()}
        >
          <option value="">
          </option>
          {optionsList}
        </select>
      </div>
    );
  }
});

export default SelectField;