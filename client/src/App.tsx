import './assets/scss/index.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import { chartjs } from './helpers';
import Routes from './Routes';
import theme from './theme';

// Externals
// Material helpers
// ChartJS helpers
// Theme
// Styles
// Routes
// Browser history
const browserHistory = createBrowserHistory();

const Chart = require('react-chartjs-2').Chart;

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
