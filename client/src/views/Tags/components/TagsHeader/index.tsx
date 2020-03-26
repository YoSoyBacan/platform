import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';

import { InProgress, TagsUpdates, TotalTags } from './components';
import styles from './styles';

const TagsHeader: React.FC<{classes: any}> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} sm={6} xl={4} xs={12}>
            <InProgress className={classes.item}/>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TotalTags className={classes.item}/>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TagsUpdates className={classes.item}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(TagsHeader)