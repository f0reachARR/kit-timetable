import React from 'react';
import { render } from 'react-dom';
import { Header } from './components/shared/Header';

const main = document.querySelector('main');

render(
  <>
    <Header />
  </>,
  main,
);
