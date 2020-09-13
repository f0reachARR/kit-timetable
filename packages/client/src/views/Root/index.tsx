import React from 'react';
import { Switch as RouterSwitch, BrowserRouter, Route } from 'react-router-dom';
import { Header } from '../../components/shared/Header';
import { SubjectSearch } from '../SubjectSearch';

export const RootView = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <RouterSwitch>
        </RouterSwitch>
      </>
    </BrowserRouter>
  );
};
