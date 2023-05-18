import React from 'react';
import './login.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAuth, fetchLogin, selectIsAuth} from '../../redux/slices/auth';
import {Navigate} from 'react-router-dom';

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    //console.log(data);
    if (!data.payload) {
      return alert('Was unable to login');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <div className="login_block">
      <h2 className="login_title">Login to enter a blog</h2>
      <div className="login_form">
        <form onSubmit={handleSubmit(onSubmit)} className="login_inner">
          <span className="log_field">
            <TextField
              className="inp_field"
              label="E-Mail"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register('email', {required: 'Enter email'})}
              fullWidth
            />
          </span>
          <span className="log_field">
            <TextField
              type="password"
              className="inp_field"
              label="Password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register('password', {required: 'Enter password'})}
              fullWidth
            />
          </span>
          <span className="log_field">
           <Button disabled={!isValid} type="submit" size="large" variant="contained" className="form_login">
             LOGIN
           </Button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;