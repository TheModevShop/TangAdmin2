import React from 'react';
import formsy from 'formsy-react';

const InputField = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    if (this.props.onChangeCallback) {
      this.props.onChangeCallback(event)
    };
  },
  render() {
    const className = 'form-group ' + (this.props.className || ' ') + (this.showRequired() ? 'required ' : this.showError() ? 'error ' : '');
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          disabled={this.props.disabled || this.isFormDisabled()}
          className="form-control"
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange ? this.props.onChange : this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <div className="validation-error">{errorMessage}</div>
      </div>
    );
  }
});

export default InputField;