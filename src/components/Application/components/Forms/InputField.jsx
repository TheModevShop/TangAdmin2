import React from 'react';
import formsy from 'formsy-react';
import {Tooltip} from 'react-bootstrap';

const InputField = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group ' + (this.props.className || ' ') + (this.showRequired() ? 'required ' : this.showError() ? 'error ' : '');
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <Tooltip className={errorMessage ? "in validation-error" : "validation-error" } placement="top" >
          {errorMessage}
        </Tooltip>
        <input
          disabled={this.props.disabled}
          className="form-control"
          type={this.props.type}
          name={this.props.name}
          onChange={this.props.onChange ? this.props.onChange : this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
      </div>
    );
  }
});

export default InputField;