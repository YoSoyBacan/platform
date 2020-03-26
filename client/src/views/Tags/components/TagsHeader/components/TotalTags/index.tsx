import { Typography, withStyles } from '@material-ui/core';
import { ArrowUpward as ArrowUpwardIcon, PeopleOutlined as PeopleIcon } from '@material-ui/icons';
import classNames from 'classnames';
import { Paper } from 'components';
import React, { Component } from 'react';

import styles from './styles';

// Externals
// Material helpers
// Material components
// Material icons
// Shared components
// Component styles
type Props = {
  classes: any;
  className?: string;
}

class TotalTags extends Component<Props,{}> {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="body2"
            >
              TOTAL TAGS
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              500
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <PeopleIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.difference}
            variant="body2"
          >
            <ArrowUpwardIcon />
            16%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Desde hace un mes
          </Typography>
        </div>
      </Paper>
    );
  }
}


export default withStyles(styles)(TotalTags);
