import React from 'react';

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import {useForm} from "react-hook-form";

import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";

import './registration.css';

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      avatarUrl: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Unable to register');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <div className="registration_block">
      <h2 className="registration_title">Fill in the register form </h2>
      <div className="registration_form">
        <form onSubmit={handleSubmit(onSubmit)} className="registration_inner">
          <span className="form_reg_container">
           <TextField
             error={Boolean(errors.fullName?.message)}
             helperText={errors.fullName?.message}
             {...register('fullName', {required: 'Enter full name'})}
             className="inp_field_reg" label="Full name" fullWidth
           />
          </span>
          <span className="form_reg_container">
           <TextField
             error={Boolean(errors.email?.message)}
             helperText={errors.email?.message}
             {...register('email', {required: 'Enter email'})}
             className="inp_field_reg" label="E-Mail" fullWidth
           />
          </span>
          <span className="form_reg_container">
           <TextField
             type="password"
             error={Boolean(errors.password?.message)}
             helperText={errors.password?.message}
             {...register('password', {required: 'Enter password'})}
             className="inp_field_reg" label="Password" fullWidth
           />
          </span>
          <span className="form_reg_container">
           <TextField
             error={Boolean(errors.avatarUrl?.message)}
             helperText={errors.avatarUrl?.message}
             {...register('avatarUrl', {required: 'Enter avatarUrl'})}
             className="inp_field_reg" label="Avatar URL" fullWidth
           />
          </span>
          <span className="form_reg_container">
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
            Register
          </Button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Registration;