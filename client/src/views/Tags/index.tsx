import { CircularProgress, Typography, withStyles } from '@material-ui/core';
import { TagListResult } from 'data/api';
import React, { Component } from 'react';

import { getTagList } from '../../services/tag';
import { TagsHeader, TagsTable, TagsToolbar } from './components';
import styles from './style';

export interface Props {
  name: string;
  classes: any;
  onSelect: () => void;
  onShowDetails: () => void;
}
export interface State {
  isLoading: boolean;
  limit: number;
  tagsResult: TagListResult;
  selectedTagsIds: string[];
  error: null;
}
// Externals
// Material helpers
// Material components
// Shared services
// Custom components
// Component styles
class TagsList extends Component<Props, State> {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    tagsResult: {
      num_results: 0,
      results: []
    },
    selectedTagsIds: [],
    error: null
  };

  async getTags() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const results  = await getTagList(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          tagsResult: results
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getTags();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = (selectedTagsIds: string[]) => {
    this.setState({ selectedTagsIds });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, tagsResult, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (tagsResult.results.length === 0) {
      return <Typography variant="h6">No tienes Tags disponibles.</Typography>;
    }

    return (
      <TagsTable
        onShowDetails={() => {
          console.log('NAVIGATE TO THE BEATIFUL PAGE');
        }}
        onSelect={this.handleSelect}
        tagList={tagsResult.results}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedTagsIds } = this.state;

    return (
        <div className={classes.root}>
          <TagsHeader/>
          <TagsToolbar selectedTagIds={selectedTagsIds} className={''}/>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
    );
  }
}


export default withStyles(styles)(TagsList);
