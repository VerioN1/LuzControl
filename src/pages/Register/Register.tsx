/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import {
  Button, CircularProgress, Container, Grid, makeStyles, TextField, Typography,
} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Logo from '../../assets/Logo';
import { login } from '../../store/Reducers/UserSlice';

interface IUserRegisterData {
    email: string;
    password: string;
    course: string;
    name: string;
  }
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));
const createUser = async (userData: IUserRegisterData) => {
  const json = JSON.stringify({
    email: userData.email,
    password: userData.password,
    course: userData.course,
    name: userData.name,
  });
  const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API}/v1/auth/register`, json, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

type props = {setRegisterState: React.Dispatch<React.SetStateAction<boolean>>};

const Register:React.FC<props> = (props) => {
  const { handleSubmit, register } = useForm<IUserRegisterData>();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const mutation = useMutation((data : IUserRegisterData) => createUser(data));

  const onSubmit = handleSubmit(async (data : IUserRegisterData) => {
    try {
      await mutation.mutateAsync(data);
      if (mutation.isSuccess) {
        console.log(mutation.data);
        history.push('/home');
        dispatch(login({
          email: mutation.data.user.email,
          name: mutation.data.user.name,
          course: mutation.data.user.course,
          isAuthenticated: true,
          token: mutation.data.tokens.access.token,
        }));
      }
    } catch (e) {
      alert('?????????? ?????????? ??????????');
    }
  });

  return (
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
                    label="????????????"
                    name="email"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                    {...register('password')}
                    label="??????????"
                    name="password"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    fullWidth
                    {...register('name')}
                    label="???? ??????"
                    name="name"
                    size="small"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                    {...register('course')}
                    label="???????? ???????? ?????? ????????"
                    name="course"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" fullWidth type="submit" variant="contained" disabled={mutation.isLoading}>
                {mutation.isLoading ? (<CircularProgress size={14} />) : '??????????'}
              </Button>
              <Typography variant="h6">????</Typography>
              <Button color="primary" fullWidth variant="contained" onClick={() => props.setRegisterState(true)}>
                ???????? ??????????
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Register;
