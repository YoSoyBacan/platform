import { Button, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { DisplayMode, SearchInput } from 'components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './styles';

// Externals
// Material helpers
// Material components
// Shared components
// Component styles
class ProductsToolbar extends Component {
  render() {
    const { classes, className, onClickCreate } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={onClickCreate}
          >
            Nuevo
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Buscar producto"
          />
          <span className={classes.spacer} />
          <DisplayMode mode="grid" />
        </div>
      </div>
    );
  }
}

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onClickCreate: PropTypes.func
};

export default withStyles(styles)(ProductsToolbar);
