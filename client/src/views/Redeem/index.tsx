import { Button, CircularProgress, Grid, IconButton, TextField, Typography, withStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { Theme } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import _ from 'underscore';
import validate from 'validate.js';

import { AuthContext } from '../../context/authentication';
import styles from './styles';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

type RedeemProps = {
  classes: any;
  className: any;
};


const Redeem = (props: RedeemProps) => {  
  const { classes, className, ...rest } = props;
  

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.sideLogoWrapper} item lg={5}>
          <div className={classes.sideLogo}>
          </div>
        </Grid>
        <Portlet
          className={classes.portlet}
          {...rest}
        >
          <PortletHeader className={classes.portletHeader}>
            <PortletLabel
              className={classes.portletLabel}
              title="Redimide los cupones de tus clientes aqui!"
            />
          </PortletHeader>
          <PortletContent noPadding>
            <form
              autoComplete="off"
              noValidate
            >
              <div className={classes.field}>
                <TextField
                  label="Pin del negocio"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  // value={businessPin}
                />
                <TextField
                  label="Pin del cliente"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  // value={clientPin}
                />
                <TextField
                  label="Codigo de la tarjetas bacán"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  // value={cardCode}
                />
                <TextField
                  label="Valor a redimir"
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  // value={redeemValue}
                />
              </div>
            </form>
          </PortletContent>
          <PortletFooter className={classes.portletFooter}>
            <Button
              color="secondary"
              variant="contained"
            >
              Redimir
            </Button>
          </PortletFooter>
        </Portlet>
      </Grid>
    </div>
  );
};
export default compose(withRouter, withStyles(styles as any))(Redeem as any);
