import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {
  ThemeProvider, createTheme,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { store } from './store/store';
import AppWrapper from './AppWrapper';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const darkTheme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#DF93E1',
    },
    secondary: {
      light: '#0066ff',
      main: '#355070',
      contrastText: '#FFFFFF',
    },
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider jss={jss}>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <AppWrapper />
        </QueryClientProvider>
      </ThemeProvider>
    </StylesProvider>
  </Provider>,
  document.getElementById('root'),
);
