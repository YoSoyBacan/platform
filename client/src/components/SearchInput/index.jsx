import { Input, withStyles } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles';

// Externals
// Material helpers
// Material components
// Material icons
// Component styles
const SearchInput = props => {
  const { classes, className, onChange, style, ...rest } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div
      className={rootClassName}
      style={style}
    >
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
        placeholder={rest.placeholder}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object,
  placeholder: PropTypes.string
};

SearchInput.defaultProps = {
  onChange: () => {}
};

export default withStyles(styles)(SearchInput);
