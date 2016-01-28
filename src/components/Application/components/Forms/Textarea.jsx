import React from 'react';
import formsy from 'formsy-react';

const Textarea = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget['value']);
  },
  render() {
    const className = 'form-group ' + (this.props.className || ' ') + (this.showRequired() ? ' required' : this.showError() ? ' error' : null);
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <textarea className="form-control" name={this.props.name} onChange={this.changeValue} value={this.getValue()}></textarea>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});



export default Textarea;