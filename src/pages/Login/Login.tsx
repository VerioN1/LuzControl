/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// MUI Core
import Button from '@mui/material/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { CircularProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { useMutation } from 'react-query';
import Logo from '../../assets/Logo';
import { login } from '../../store/Reducers/UserSlice';
import Register from '../Register/Register';

interface FormData {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const loginUser = async (userData: FormData) => {
  const json = JSON.stringify({ email: userData.email, password: userData.password });
  const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/v1/auth/login`, json, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const Login: React.FC = () => {
  const [isRegistered, setRegistered] = useState(true);
  const { handleSubmit, register } = useForm<FormData>();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const mutation = useMutation((data : FormData) => loginUser(data));

  const onSubmit = handleSubmit(async (data : FormData) => {
    try {
      await mutation.mutateAsync(data);
      if (mutation.isSuccess) {
        console.log(mutation.data);
        history.push('/Calender');
        dispatch(login({
          email: mutation.data.user.email,
          name: mutation.data.user.name,
          course: mutation.data.user.course,
          token: mutation.data.tokens.access.token,
          isAuthenticated: true,
        }));
      }
    } catch (e) {
      alert('Incorrect email or password! please try again');
    }
  });

  return (
    <>
      {
      isRegistered ? (

        <div style={{
          display: 'flex', flexDirection: 'column', backgroundColor: '#EAEAEA', padding: '60px', borderRadius: '10px',
        }}
        >
          <Logo />
          <Container className={classes.container} maxWidth="xs">
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        {...register('email')}
                        label="אימייל"
                        name="email"
                        size="small"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        {...register('password')}
                        label="סיסמה"
                        name="password"
                        size="small"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button color="primary" fullWidth type="submit" variant="contained" disabled={mutation.isLoading}>
                    {mutation.isLoading ? (<CircularProgress size={14} />) : 'התחבר'}
                  </Button>
                  <Typography variant="h6">או</Typography>
                  <Button color="primary" fullWidth variant="contained" onClick={() => setRegistered(false)}>
                    צור משתמש
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      )
        : (<Register setRegisterState={setRegistered} />)
    }
    </>
  );
};

export default Login;
