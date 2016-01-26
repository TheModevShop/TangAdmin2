import React from 'react';
import formsy from 'formsy-react';

const InputField = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group ' + (this.props.className || ' ') + (this.showRequired() ? 'required ' : this.showError() ? 'error ' : null);
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          className="form-control"
          type={this.props.type}
          name={this.props.name}
          onChange={this.changeValue}
          onBlur={this.checkBlur}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default InputField;