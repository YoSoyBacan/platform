import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  Money as MoneyIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class MonetaryCard extends Component {
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
             {this.props.title} 
            </Typography>
            <Typography className={classes.value} variant="h3" >
              ${this.props.value}
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <MoneyIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.footer}>
          <Typography
            className={classes.difference}
            variant="body2"
          >
            {this.props.percentage}
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            {this.props.time}
          </Typography>
        </div>
      </Paper>
    );
  }
}

MonetaryCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired, 
  value: PropTypes.number.isRequired, 
  title: PropTypes.string.isRequired, 
  percentage: PropTypes.string,
  time: PropTypes.string
};

export default withStyles(styles)(MonetaryCard);
