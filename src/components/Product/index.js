import React from 'react';

import { Paper, Typography, Grid, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import PriceFormat from 'components/PriceFormat';

import useStyles from './style';

const Product = ({ productInfo }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Paper elevation={3} className={classes.root}>
      <img
        src={productInfo.thumbnails}
        alt={productInfo.name}
        className={classes.thumbnail}
        style={{
          width: matchUpSm ? '150px' : '124px',
          height: matchUpSm ? '150px' : '124px',
        }}
      />

      <Typography className={classes.productName}>
        {productInfo.name}
      </Typography>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography className={classes.discountPrice} component='div'>
            <PriceFormat price={productInfo.price} />
          </Typography>
          <Typography className={classes.price} component='div'>
            <PriceFormat price={productInfo.price} />
          </Typography>
        </Grid>
        <Grid item>
          <IconButton color='primary'>
            <ShoppingCartOutlinedIcon fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
