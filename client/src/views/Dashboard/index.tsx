import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { APIClient } from '../../lib/fetch';
import { AuthContext } from '../../context/authentication';
import { useFetch } from '../../lib/fetch';
import { BusinessHomeResponse } from '../../lib/models';
import { DevicesChart, MonetaryCard, OrdersTable, ProductList, Profit, Progress, SalesChart, Users } from './components';
import palette from 'theme/palette';
import moment from 'moment';

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

  let salesProgress = 0;
  let salesChartData = {};

  if (data) {
    salesProgress = (data.data.header.totalSales / data.data.header.salesObjective) * 100;
    
    salesChartData = {
      labels: data.data.lastSales.salesPerDay.map(sale => {
        let date =  new Date(sale.date);
        const convertedDate = moment(date).format('MMM Do, YYYY');
        return convertedDate;
      }),
      datasets: [
        {
          label: 'Vendio',
          backgroundColor: palette.primary.main,
          data: data.data.lastSales.salesPerDay.map(sale => sale.sales)
        },
      ]
    }
  
  }

  return (
    data && <div className={classes.root}>
      <Grid container spacing={2}>
         <Grid item lg={8} sm={6} xl={3} xs={12}>
          <Profit
            className={classes.item}
            value={data.data.header.totalSales}
            title={"TOTAL VENDIDO"}
          />
        </Grid>
        <Grid item lg={4} sm={6} xl={3} xs={12}>
          <Users className={classes.item} totalusercount={data.data.header.totalClients} />
        </Grid>
        <Grid item lg={4} sm={6} xl={3} xs={12}>
          <MonetaryCard
            className={classes.item}
            value={data.data.header.amountRedeemed}
            title={"CANTIDAD REDIMIDA"}
          />
        </Grid>
        <Grid item lg={4} sm={6} xl={3} xs={12}>
          <MonetaryCard
            className={classes.item}
            value={data.data.header.depositedAmount}
            title={"CANTIDAD DEPOSITADA"}
          />
        </Grid>
        <Grid item lg={4} sm={6} xl={3} xs={12}>
          <Progress className={classes.item} percentage={salesProgress.toString()} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <SalesChart className={classes.item} data={salesChartData} />
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
