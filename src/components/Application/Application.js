import React from 'react';
import {root} from 'baobab-react/higher-order';
import tree from 'state/StateTree';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Footer from './components/Footer';
import _ from 'lodash';
import './app.less';

class App extends React.Component {
  render() {
    const classNames = _.reduce(this.props.routes, (accum, route) => {
      if (route.pageName) {
        accum += route.pageName + ' ';
      }
      return accum;
    }, '');
    return (      
      <div className={classNames.trim()+'-wrapper ' + 'main-container'}>
      <div className="app-header">
        <Header />
      </div>

        {
          classNames.trim() !== 'login' ? 
          <SideBar /> : null
        }
        <div className={classNames + 'pages'}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }

}

App.contextTypes = {
  history: React.PropTypes.object
};

export default root(App, tree);