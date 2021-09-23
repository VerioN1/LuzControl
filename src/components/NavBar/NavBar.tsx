/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import MixedText from '../MixedText/MixedText';
import { logout } from '../../store/Reducers/UserSlice';
import { RootState } from '../../store/store';

const NavBar:React.FC = (props) => {
  const dispacth = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  return (
    <Box style={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ color: 'black', background: 'transparent', boxShadow: 'none' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="menu"
              component={Link}
              to="/"
            >
              <MixedText boldedText="Luz" normalText="Control" />
            </IconButton>
            <Typography>{` שלום ${userData.name}`}</Typography>
          </div>
          <div>
            <Button component={Link} to="/Calender" color="inherit" style={{ direction: 'rtl' }}>מה לוז?</Button>
            <Button component={Link} to="/CreateCourse" color="inherit" style={{ direction: 'rtl' }}>צור קורס</Button>
            <Button onClick={() => dispacth(logout())}>התנתק</Button>
          </div>
        </Toolbar>
      </AppBar>
      {props.children}
    </Box>
  );
};
export default NavBar;
