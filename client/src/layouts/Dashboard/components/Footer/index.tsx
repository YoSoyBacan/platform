// Material components
import { Divider, makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
}));

type Props = {
  className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <Divider />
      <Typography className={classes.company} variant="body1">
        &copy; Voom SA. 2020
      </Typography>
    </div>
  );
};

export default Footer;
