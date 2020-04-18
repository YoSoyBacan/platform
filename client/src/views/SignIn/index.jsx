import { Button, CircularProgress, Grid, IconButton, TextField, Typography, withStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import _ from 'underscore';
import validate from 'validate.js';

import { AuthContext } from '../../context/authentication';
import firebase from '../../lib/firebase';
import schema from './schema';
import styles from './styles';

// Externals
// Material helpers
// Material components
// Material icons
// Shared components
// Component styles
// Form validation schema
// Service methods
const signIn = async (email, password) => {
  const firebaseUser = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return firebaseUser;
};

class SignIn extends Component {
  state = {
    values: {
      email: "",
      password: "",
    },
    touched: {
      email: false,
      password: false,
    },
    errors: {
      email: null,
      password: null,
    },
    isValid: false,
    isLoading: false,
    submitError: null,
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;
      const {
        authenticated,
        setAuthenticated,
        setAuthBody,
        setAuthToken,
      } = useContext(AuthContext);

      if (authenticated) {
        history.push("/dashboard");
        return;
      }

      this.setState({ isLoading: true });

      const firebaseUser = await signIn(values.email, values.password);
      const userId = firebaseUser.user.uid;
      setAuthToken(firebaseUser.credential.providerId);
      setAuthenticated(true);

      // Get the business info

      history.push("/dashboard");
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading,
    } = this.state;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Ingresa
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={(event) =>
                        this.handleFieldChange("email", event.target.value)
                      }
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={(event) =>
                        this.handleFieldChange("password", event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography className={classes.submitError} variant="body2">
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Ingresa Ahora
                    </Button>
                  )}
                  <Typography className={classes.signUp} variant="body1">
                    No tienes una cuenta?{" "}
                    <a
                      className={classes.signUpUrl}
                      href="google.com"
                      target="_blank"
                    >
                      Regístrate
                    </a>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(withRouter, withStyles(styles))(SignIn);
