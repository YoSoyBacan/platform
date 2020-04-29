import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid, Typography,  Button } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: '150px',
    textAlign: 'center'
  },
  image: {
    display: 'inline-block',
    marginTop: '50px',
    marginBottom: '50px',
    maxWidth: '100%',
    width: '554px'
  }
});

const handleOnClick = () => {
  window.location.replace('https://www.yosoybacan.com');
  return
}

class InConstruction extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          verticalAlign="top"
          spacing={4}
        >
          <Grid
            item
            lg={8}
            xs={12}
          >
            <div className={classes.content}>
              <Typography variant="h1">
                Gracias por confiar en nosotros y hacer tu negocio más Bacán!
              </Typography>
              <Typography variant="h5">
                Estamos trabajando duro en esta plataforma en donde podras saber todo sobre tu negocio! Esperalo pronto...
              </Typography>
              <img
                alt="Under development"
                className={classes.image}
                src="/images/not_found.png"
              />
              <Typography variant="h3" margin="70px">
                Aun no estas registrado?
              </Typography>
              <Button 
                className={classes.signInButton}
                color="primary"
                onClick={handleOnClick}
                size="large"
                variant="contained"
              >
                Registrate aquí!
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InConstruction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InConstruction);
