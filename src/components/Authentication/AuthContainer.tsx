/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../../pages/Login';
import { RootState } from '../../store/store';

const AuthContainer : React.FC = (props) => {
  const authState = useSelector((state: RootState) => state.userData);
  if (!authState.isAuthenticated) {
    return (
      <Login />
    );
  }
  return (
    <>
      {props.children}
    </>
  );
};

export default AuthContainer;
