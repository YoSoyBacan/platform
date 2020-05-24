import { Button, CircularProgress, Grid, IconButton, TextField, Typography, withStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import _ from 'underscore';
import validate from 'validate.js';

import { AuthContext } from '../../context/authentication';
import { APIClient } from '../../lib/fetch';
import firebase from '../../lib/firebase';
import schema from './schema';
import styles from './styles';
import InConstruction from 'views/InConstruction';

// Externals
// Material helpers
// Material components
// Material icons
// Shared components
// Component styles
// Form validation schema
// Service methods
const signIn = async (email: string, password: string) => {
  const firebaseUser = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return firebaseUser;
};

type UserResponse = {
  user: {
    _id: string;
    firstName: string;
    email: string;
  };
  business: {
    _id: string;
    legalName: string;
    legalId: string;
  };
};

type SignInProps = {
  className: string;
  classes: any;
  history: any;
};

const SignIn = (props: SignInProps) => {
  const {
    authenticated,
    setAuthenticated,
    setAuthBody,
    setAuthToken,
  } = useContext(AuthContext);

  const [state, setState] = useState({
    values: {
      email: "",
      password: "",
    },
    touched: {
      email: false,
      password: false,
    },
    errors: {
      email: [],
      password: [],
    },
    isValid: false,
    submitError: null,
  });

  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    const { history } = props;

    history.goBack();
  };

  const validateForm = _.debounce(() => {
    const { values } = state;

    const newState = { ...state };
    const errors = validate(values, schema);
    newState.errors = errors || [];
    newState.isValid = !!errors ? false : true;

    setState({
      ...newState,
    });
  }, 300);

  const handleFieldChange = (field: string, value: string | boolean | null) => {
    const newState = { ...state };

    newState.submitError = null;
    (newState.touched as any)[field] = true;
    (newState.values as any)[field] = value;

    setState(newState);
    validateForm();
  };

  /* RENDER */

  const handleSignIn = async () => {
    try {
      const { history } = props;
      const { values } = state;

      setLoading(true);
      const firebaseUser = await signIn(values.email, values.password);
      const userId = firebaseUser.user!.uid as string;
      const token = await firebaseUser.user!.getIdToken();
      setAuthToken(token || "");
      setAuthenticated(true);

      // Get the business info
      const client = new APIClient(token || "");
      console.log(client);
      const response = await client.get<UserResponse>(`user/${userId}`);
      console.log(response);
      setAuthBody({
        legalName: response.data.business.legalName,
        businessId: response.data.business._id,
        legalId: response.data.business.legalId,
        firstName: response.data.user.firstName, 
        userId: response.data.user._id,
      });
      //TODO CHANGE THIS 
      console.log("here");
      setLoading(false);
      history.push("/dashboard");
      return;
    } catch (error) {
      console.log("error");
      const { history } = props;
      // TODO handle multiple errors! 
      // console.log("ERROR");
      // console.log(error);
      setState({
        ...state,
        errors: {
          email: ["Email y contraseña inválidos"] as any,
          password: {
            ...state.errors.password,
          },
        },
      });
      setLoading(false);
    }
  };

  const handleRedeem = async () => {
    const { history } = props;

    history.push("/redime");
  };

  const { classes } = props;
  const { values, touched, errors, isValid, submitError } = state;
  const showEmailError =
    touched.email && errors.email && errors.email.length > 0;
  const showPasswordError =
    touched.password && errors.password && errors.password.length > 0;
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.sideLogoWrapper} item lg={5}>
          <div className={classes.sideLogo}>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form}>
                <Typography className={classes.title} variant="h2">
                  Ingresa
                </Typography>
                <div className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Email"
                    name="email"
                    onChange={(event) =>
                      handleFieldChange("email", event.target.value)
                    }
                    type="text"
                    value={values.email}
                    variant="outlined"
                  />
                  {showEmailError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.email![0]}
                    </Typography>
                  )}
                  <TextField
                    className={classes.textField}
                    label="Contaseña"
                    name="password"
                    onChange={(event) =>
                      handleFieldChange("password", event.target.value)
                    }
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  {showPasswordError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.password![0]}
                    </Typography>
                  )}
                </div>
                {submitError && (
                  <Typography className={classes.submitError} variant="body2">
                    {submitError}
                  </Typography>
                )}
                {loading ? (
                  <CircularProgress className={classes.progress} />
                ) : (
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!isValid}
                    onClick={handleSignIn}
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
                    href="https://registro.yosoybacan.com"
                    target="_blank"
                  >
                    Regístrate aquí!
                  </a>
                </Typography>
              </form>
              <Button
                    className={classes.redeemButton}
                    color="secondary"
                    disabled={!isValid}
                    onClick={handleRedeem}
                    size="large"
                    variant="contained"
                  >
                    Redimir
                  </Button>
            </div>
          </div>
        </Grid>
      </Grid> 
    </div>
  );
};
 export default compose(withRouter, withStyles(styles as any))(SignIn as any);
