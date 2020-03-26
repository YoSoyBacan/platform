import { Typography, withStyles } from '@material-ui/core';
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

class TagsUpdates extends Component<Props, {}> {
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
              ACTUALIZACIONES
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              $23,200
            </Typography>
          </div>
        </div>

      </Paper>
    );
  }
}


export default withStyles(styles)(TagsUpdates);
