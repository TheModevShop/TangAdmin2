import React from 'react';
import app from 'components/Application';

window.onload = () => {
  React.render(
    <app />,
    document.querySelector('#container')
  );
};