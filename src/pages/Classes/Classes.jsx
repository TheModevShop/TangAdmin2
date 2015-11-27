import React from 'react';
import {branch} from 'baobab-react/higher-order';

class Classes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default branch(Classes, {
  cursors: {
    classes: ['classes']
  }
});
