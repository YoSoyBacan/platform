import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import {
  AccountBoxOutlined as AccountBoxIcon,
  AssignmentOutlined as IngresosIcon,
  DashboardOutlined as DashboardIcon,
  InfoOutlined as InfoIcon,
  Money as MoneyIcon,
  SettingsOutlined as SettingsIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  TimelineOutlined as TimelineIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import useStyles from './useStyles';

// Externals
// Material helpers
// Material components
// Material icons
// Component styles
type Props = {
  className?: string;
};

const Sidebar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);

  return (
    <nav className={rootClassName}>
      <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to="/">
          <img
            alt="Voom logo"
            className={classes.logoImage}
            src="/images/logos/brainalytica_logo.svg"
          />
        </Link>
        <Typography variant="h1" className={classes.logoTitle}>
            Voom
        </Typography>
      </div>
      <Divider className={classes.logoDivider} />
      <div className={classes.profile}>
        <Link to="/account">
          <Avatar
            alt="La Mía Supermercados"
            className={classes.avatar}
            src="/images/avatars/avatar_1.png"
          />
        </Link>
        <Typography className={classes.nameText} variant="h6">
          La Mía Supermercados
        </Typography>
        <Typography className={classes.bioText} variant="caption">
          Otavalo, Ecuador
        </Typography>
      </div>
      <Divider className={classes.profileDivider} />
      <List component="div" disablePadding>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard">
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Dashboard"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/productos">
          <ListItemIcon className={classes.listItemIcon}>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Productos"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/tags">
          <ListItemIcon className={classes.listItemIcon}>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Tags"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/sign-in">
          <ListItemIcon className={classes.listItemIcon}>
            <IngresosIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Ingresos"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/icons">
          <ListItemIcon className={classes.listItemIcon}>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Métricas"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/account">
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Perfil"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/settings">
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Ajustes"
          />
        </ListItem>
      </List>
      <Divider className={classes.listDivider} />
      <List
        component="div"
        disablePadding
        subheader={
          <ListSubheader className={classes.listSubheader}>
            Servicio al Cliente
          </ListSubheader>
        }>
        <ListItem
          className={classes.listItem}
          component="a"
          href="https://devias.io/contact-us"
          target="_blank">
          <ListItemIcon className={classes.listItemIcon}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Customer support"
          />
        </ListItem>
      </List>
    </nav>
  );
};
export default Sidebar;
