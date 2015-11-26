import React from 'react';
import './footer.less';

class Footer extends React.Component {

  render() {
    return (
      <div className="app-footer">
      </div>
    );
  }
}

Footer.contextTypes = {
  history: React.PropTypes.object
};

export default Footer;