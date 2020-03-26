import React, { Component, useState, useRef, useEffect } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

// Shared services
import { getOrders } from 'services/order';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  Status
} from 'components';

// Component styles
import useStyles from './useStyles';
import { Order } from 'data/orders';

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refund: 'danger'
};

type Props = {
  className?: string;
};

type State = {
  isLoading: boolean;
  limit: number;
  orders: Order[];
  ordersTotal: number;
  error?: any;
};
const OrdersTable: React.FC<Props> = ({ className }) => {
  const signalRef = useRef(false);

  const classes = useStyles();

  const [{ isLoading, orders, ordersTotal, limit }, setState] = useState<State>(
    {
      isLoading: false,
      limit: 10,
      orders: [],
      ordersTotal: 0
    }
  );

  const rootClassName = classNames(classes.root, className);
  const showOrders = !isLoading && orders.length > 0;

  const _getOrders = async (limit: number) => {
    try {
      setState(state => ({ ...state, isLoading: true }));

      const { orders, ordersTotal } = await getOrders(limit);

      if (signalRef.current) {
        setState(state => ({
          ...state,
          isLoading: false,
          orders,
          ordersTotal
        }));
      }
    } catch (error) {
      if (signalRef.current) {
        setState(state => ({
          ...state,
          isLoading: false,
          error
        }));
      }
    }
  };

  useEffect(() => {
    _getOrders(limit);
    return () => {
      signalRef.current = false;
    };
  }, [limit]);
  return (
    <Portlet className={rootClassName}>
      <PortletHeader noDivider>
        <PortletLabel
          subtitle={`${ordersTotal} in total`}
          title="Latest orders"
        />
        <PortletToolbar>
          <Button
            className={classes.newEntryButton}
            color="primary"
            size="small"
            variant="outlined">
            New entry
          </Button>
        </PortletToolbar>
      </PortletHeader>
      <PerfectScrollbar>
        <PortletContent className={classes.portletContent} noPadding>
          {isLoading && (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          )}
          {showOrders && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell align="left">Customer</TableCell>
                  <TableCell align="left" sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow className={classes.tableRow} hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className={classes.customerCell}>
                      {order.customer!.name}
                    </TableCell>
                    <TableCell>
                      {moment(order.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusWrapper}>
                        <Status
                          className={classes.status}
                          color={statusColors[order.status]}
                          size="sm"
                        />
                        {order.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </PortletContent>
      </PerfectScrollbar>
    </Portlet>
  );
};

export default OrdersTable;
