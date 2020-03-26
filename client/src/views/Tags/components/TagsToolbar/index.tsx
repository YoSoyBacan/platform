import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { DisplayMode, SearchInput } from 'components';
import React, { Component } from 'react';

import styles from './styles';

// Material icons
export interface Props {
  classes: any;
  className: string;
  selectedTagIds: string[]
};
export interface State {

};


class TagsToolbar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes, className, selectedTagIds } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedTagIds.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={() => {
                console.log('Deleting here');
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            Nuevo
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
          />
          <span className={classes.spacer} />
          <DisplayMode mode="list" />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TagsToolbar);