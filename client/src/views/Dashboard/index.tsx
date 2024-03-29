import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { APIClient } from '../../lib/fetch';
import { AuthContext } from '../../context/authentication';
import { useFetch } from '../../lib/fetch';
import { BusinessHomeResponse } from '../../lib/models';
import { DevicesChart, MonetaryCard, OrdersTable, ProductList, Profit, Progress, SalesChart, Users } from './components';


// Material helpers
// Material components
// Shared layouts
// Custom components
// Component styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  item: {
    height: "100%",
  },
}));

 
const Dashboard = () => {
  const { authBody, authToken } = useContext(AuthContext);
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState<BusinessHomeResponse | null>(null);
  const businessId  = !!authBody ? authBody.businessId : '';
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const client = new APIClient(authToken || ""); 
      try {
        const response = await client.get<BusinessHomeResponse>(`home/${businessId}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, [])
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <MonetaryCard
            className={classes.item}
            value={200}
            title={"CANTIDAD REDIMIDA"}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Users className={classes.item} totalusercount={200} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Progress className={classes.item} percentage={"54"} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Profit
            className={classes.item}
            value={500}
            title={"TOTAL VENDIDO"}
          />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <SalesChart className={classes.item} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <DevicesChart className={classes.item} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <ProductList className={classes.item} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <OrdersTable className={classes.item} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
