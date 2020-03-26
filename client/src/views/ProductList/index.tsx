import { CircularProgress, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from 'services/product';

import { ProductCard, ProductsToolbar } from './components';
import styles from './styles';
import { CreateProduct } from './views';

// Externals
// Material helpers
// Material components
// Material icons
// Shared layouts
// Shared services
// Custom components
// Component styles
enum PageState {
  OVERVIEW = "OVERVIEW",
  CREATE = "CREATE"
};

type Props = {
  classes: any;
};
type State = {
  page: PageState;
  isLoading: boolean;
  limit: number;
  products: any[];
  productsTotal: number;
  error: any;
};
class ProductList extends Component<Props, State> {
  signal = true;

  state = {
    page: PageState.OVERVIEW,
    isLoading: false,
    limit: 6,
    products: [],
    productsTotal: 0,
    error: null
  };

  async getProducts(limit: number) {
    try {
      this.setState({ isLoading: true });

      const { products, productsTotal } = await getProducts(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          products,
          productsTotal,
          limit
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

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getProducts(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderProducts() {
    const { classes } = this.props;
    const { isLoading, products } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Typography variant="h6">There are no products available</Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
      >
        {products.map((product: any) => (
          <Grid
            item
            key={product.id}
            lg={4}
            md={6}
            xs={12}
          >
            <Link to="#">
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    if (this.state.page === PageState.CREATE) {
      return (
        <div className={classes.root}>
          <CreateProduct classes={classes} onBack={() => {
            this.setState({
              page: PageState.OVERVIEW
            });
          }}/>
        </div>
      );
    }
    return (
        <div className={classes.root}>
          <ProductsToolbar onClickCreate={() => {
            this.setState({
              page: PageState.CREATE
            });
          }}/>
          <div className={classes.content}>{this.renderProducts()}</div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(ProductList);
