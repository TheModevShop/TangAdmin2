import React from 'react';
import {root} from 'baobab-react/higher-order';
import tree from 'state/StateTree';
import Header from './components/Header';
import Footer from './components/Footer';
import _ from 'lodash';

class App extends React.Component {
  render() {
    const classNames = _.reduce(this.props.routes, (accum, route) => {
      if (route.pageName) {
        accum += route.pageName + ' ';
      }
      return accum;
    }, '');
    return (
      <div className={classNames + 'main-container'}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }

}

App.contextTypes = {
  history: React.PropTypes.object
};

export default root(App, tree);