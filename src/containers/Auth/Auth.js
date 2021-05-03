import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { checkValidation, formBuilder, renderForm } from '../../Util';
import * as actions from '../../store/actions';

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: formBuilder(
      [true, "Email can't be empty"],
      {
        isEmail: true,
      },
      'Email',
      'email',
    ),
    password: formBuilder(
      [true, 'Password must be at least 6 characters'],
      {
        minLength: 6,
      },
      '••••••',
      'password',
    ),
  });

  const [isSignup, setIsSignup] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const form = { ...authForm };
    const updatedFormElement = { ...form[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.validation.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    form[inputIdentifier] = updatedFormElement;

    setAuthForm(form);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const errorMessage = props.error ? <p>{props.error.message}</p> : null;
  return props.loading ? (
    <Spinner />
  ) : (
    <div className={classes.Auth}>
      {errorMessage}
      {renderForm(authForm, inputChangedHandler)}
      <Button clicked={submitHandler} btnType="Success">{isSignup ? 'SIGN UP' : 'LOG IN'}</Button>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO SIGN
        {' '}
        {isSignup ? 'IN' : 'UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isBuilding: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
  isLoggedIn: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
