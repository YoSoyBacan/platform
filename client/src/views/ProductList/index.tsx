import { CircularProgress, Grid, IconButton, Typography, makeStyles,withStyles } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import React, {useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ProductCard, ProductsToolbar } from './components';
import styles from './styles';
import { CreateProduct } from './views';
import { APIClient } from 'lib/fetch';
import { AuthContext } from 'context';
import { BusinessVoucherOptionsResponse } from '../../lib/models';
import { getProducts } from 'services/product';

enum PageState {
  OVERVIEW = "OVERVIEW",
  CREATE = "CREATE"
};


// Component styles
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
}));

type ProductListProps  = {
  className: string;
  classes: any;
}

type Products = {
  tarjetas_publicadas: Array<{
    valor: number,
    descuento: string,
    numero_de_ventas: number,
    fecha_creacion: Date
  }>,
  tarjetas_disponibles: Array<{
    valor: number
  }>
};

type TarjetaPublicada = {
  valor: number,
  descuento: string,
  numero_de_ventas: number,
  fecha_creacion: Date
}

// type getProductsType = { 
//   products: Product[]; 
//   productsTotal: number 
// };

//TODO  DANI FINISH 
const ProductList = (props: ProductListProps) => {
  const { authBody, authToken } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(false);
  const [ pageState, setPageState ] = useState<PageState>();
  const [ products, setProducts ] = useState<Products>();
  const businessId  = !!authBody ? authBody.businessId : '';

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await getProducts(authToken, businessId);
        setProducts(response.data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, [])
  const { classes } = props;


  const renderProducts = (() => {
    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if ( products && products.tarjetas_publicadas.length === 0) {
      return (
        <Typography variant="h6">There are no products available</Typography>
      );
    }

    return (
      products && 
      <Grid
        container
        spacing={3}
      >
        {products.tarjetas_publicadas.map((product: TarjetaPublicada) => (
          <Grid
            item
            key={product.valor}
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
  });


  if (pageState === PageState.CREATE) {
      return (
        <div className={classes.root}>
          <CreateProduct classes={classes} onBack={() => setPageState(PageState.OVERVIEW)}/>
        </div>
      );
    }

  return (
      <div className={classes.root}>
        <ProductsToolbar onClickCreate={() => setPageState(PageState.CREATE)}/>
        <div className={classes.content}>{renderProducts()}</div>
        <div className={classes.pagination}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
  );
};

export default withStyles(styles)(ProductList);
