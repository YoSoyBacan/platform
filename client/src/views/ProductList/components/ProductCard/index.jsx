import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography, Divider } from '@material-ui/core';

// Material icons
import {
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class ProductCard extends Component {
  render() {
    const { classes, className, product } = this.props;

    const rootClassName = classNames(classes.root, className);

    const voucherCardColors  = [ "red", "blue", "yellow"];
    const randomCardColor = voucherCardColors[Math.floor(Math.random() * voucherCardColors.length)];
    const cardSourceImage = `images/products/${randomCardColor}_gift_card.png`;

    return (
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img
            alt="Product"
            className={classes.image}
            src={cardSourceImage}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Valor:  {product.valor}
          </Typography>
          <Typography
            className={classes.description}
            variant="body1"
          >
            Descuento: {product.descuento}
          </Typography>
        </div>
        <Divider />
        <div className={classes.stats}>
          <AccessTimeIcon className={classes.updateIcon} />
          <Typography
            className={classes.updateText}
            variant="body2"
          >
            Creado {product.fecha_creacion}
          </Typography>
          <AttachMoneyIcon className={classes.moneyIcon} />
          <Typography
            className={classes.downloadsText}
            variant="body2"
          >
          {product.numero_de_ventas} Ventas
          </Typography>
        </div>
      </Paper>
    );
  }
}

ProductCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
