import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';
import classNames from 'classnames';
import { Portlet, PortletContent } from 'components';
import { TagRow } from 'data/api';
import moment from 'moment';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

import styles from './styles';

// Externals
// Material helpers
// Material components
// Shared helpers
// Shared components
// Component styles

export interface State {
  selectedTagsIds: string[];
  activeTab: number;
  rowsPerPage: number;
  page: number;
}

export interface Props {
  classes: any;
  tagList: TagRow[]
  className?: string;
  onSelect: (tagIds: string[]) => void;
  onShowDetails: (tagId: string) => void;
};

class TagsTableComponent extends React.Component<Props, State> {
  state = {
    selectedTagsIds: [],
    rowsPerPage: 10,
    page: 0,
    activeTab: 1
  };

  handleSelectAll = (event: any) => {
    const { tagList, onSelect } = this.props;

    let selectedTagIds: string[];

    if (event.target.checked) {
      selectedTagIds = tagList.map(tag => tag.id);
    } else {
      selectedTagIds = [];
    }

    this.setState({ selectedTagsIds: selectedTagIds });

    onSelect(selectedTagIds);
  };

  handleSelectOne = (event: any, id: string) => {
    const { onSelect } = this.props;
    const selectedTagsIds  = this.state.selectedTagsIds as string[];

    const selectedIndex = selectedTagsIds.indexOf(id);
    let newSelectedTagIds: string[] = [];

    if (selectedIndex === -1) {
      newSelectedTagIds = newSelectedTagIds.concat(selectedTagsIds, id);
    } else if (selectedIndex === 0) {
      newSelectedTagIds = newSelectedTagIds.concat(selectedTagsIds.slice(1));
    } else if (selectedIndex === selectedTagsIds.length - 1) {
      newSelectedTagIds = newSelectedTagIds.concat(selectedTagsIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedTagIds = newSelectedTagIds.concat(
        selectedTagsIds.slice(0, selectedIndex),
        selectedTagsIds.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedTagsIds: newSelectedTagIds });

    onSelect(newSelectedTagIds);
  };

  handleChangePage = (event: any, page: number) => {
    this.setState({ ...this.state, page });
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, tagList } = this.props;
    const { activeTab, rowsPerPage, page } = this.state;
    const selectedTagsIds = this.state.selectedTagsIds as string[];
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    ID
                  </TableCell>
                  <TableCell align="left">Modelo</TableCell>
                  <TableCell align="left">Plantilla</TableCell>
                  <TableCell align="left">Estado</TableCell>
                  <TableCell align="left">Señal</TableCell>
                  <TableCell align="left">Producto</TableCell>
                  <TableCell align="left">Categoria</TableCell>
                  <TableCell align="left">Últ Actualizacion</TableCell>
                  <TableCell align="left">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tagList
                  .slice(0, rowsPerPage)
                  .map(tag => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={tag.id}
                      selected={selectedTagsIds.indexOf(tag.id) !== -1}
                      onClick={() => {
                        alert('Lets Go!');
                      }}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {tag.id}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {tag.modelo}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {tag.plantilla}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {tag.status}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {tag.señal}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {tag.producto.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {tag.producto.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(new Date(tag.lastUpdatedEpoch)).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                          <InfoIcon/>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={tagList.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export const TagsTable = withStyles(styles as any)(TagsTableComponent);
