import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import AuthContainer from './components/Authentication/AuthContainer';

const AppWrapper = () => {
  const isRtl = true;
  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [isRtl]);
  return (
    <BrowserRouter>
      <Route
        path="*"
        render={() => (
          <AuthContainer>
            <App />
          </AuthContainer>
        )}
      />
    </BrowserRouter>
  );
};

export default AppWrapper;
