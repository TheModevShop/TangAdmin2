import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import Modal from 'react-modal';
import routes from 'components/Application/routes';
import history from 'appHistory';
import es6Promise from 'es6-promise';
es6Promise.polyfill();


const appElement = document.getElementById('modal');
Modal.setAppElement(appElement);

render(<Router history={history}>{routes}</Router>, document.getElementById('container'));