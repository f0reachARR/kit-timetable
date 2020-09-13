import React from 'react';
import { Switch as RouterSwitch, Route } from 'react-router-dom';
import { Header } from '../../components/shared/Header';
import { SubjectSearch } from '../SubjectSearch';

export const RootView = () => {
  return (
    <>
      <Header />
      <RouterSwitch>
        <Route path='/search' component={SubjectSearch} />
      </RouterSwitch>
    </>
  );
};
