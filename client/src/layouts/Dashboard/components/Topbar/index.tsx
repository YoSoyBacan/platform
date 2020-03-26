import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext
} from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, makeStyles } from '@material-ui/core';

// Material components
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from '@material-ui/icons';

// Shared services
import { getNotifications } from 'services/notification';

// Custom components
import { NotificationList } from './components';

// Component styles
import useStyles from './useStyles';
import { __RouterContext } from 'react-router';
import { Notif } from 'data/notifications';

type Props = {
  title: string;
  className: string;
  isSidebarOpen: boolean;
  onToggleSidebar: Function;
};

type State = {
  notifications: Notif[];
  notificationsLimit: number;
  notificationsCount: number;
  notificationsEl: any;
};
const Topbar: React.FC<Props> = ({
  className,
  title,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  const signalRef = useRef(true);
  const { history } = useContext(__RouterContext);
  const [state, setState] = useState<State>({
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 0,
    notificationsEl: null
  });
  const showNotifications = Boolean(state.notificationsEl);

  const _getNotifications = async () => {
    try {
      const { notificationsLimit } = state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (signalRef.current) {
        setState(_state => ({
          ..._state,
          notifications,
          notificationsCount
        }));
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    signalRef.current = true;
    _getNotifications();
    return () => {
      signalRef.current = false;
    };
  });

  const handleSignOut = () => {
    localStorage.setItem('isAuthenticated', 'false');
    history.push('/sign-in');
  };

  const handleShowNotifications = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setState(_state => ({
      ..._state,
      notificationsEl: event.currentTarget
    }));
  };
  const handleCloseNotifications = () => {
    setState(_state => ({
      ..._state,
      notificationsEl: null
    }));
  };

  return (
    <Fragment>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={() => onToggleSidebar()}
            // variant="text"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          <IconButton
            className={classes.notificationsButton}
            onClick={handleShowNotifications}>
            <Badge
              badgeContent={state.notificationsCount}
              color="primary"
              variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} onClick={handleSignOut}>
            <InputIcon />
          </IconButton>
        </Toolbar>
      </div>
      <Popover
        anchorEl={state.notificationsEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        onClose={handleCloseNotifications}
        open={showNotifications}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <NotificationList
          notifications={state.notifications}
          onSelect={handleCloseNotifications}
        />
      </Popover>
    </Fragment>
  );
};

export default Topbar;
