import React, { useEffect } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStateValue } from '../../StateContext';

const ProductList = () => {
  const [{ formValues }, dispatch] = useStateValue();

  console.log({ formValues });

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6'>Your choosen Products</Typography>
      </Grid>
      <Grid item xs={12}>
        <ul>
          {formValues.items != null &&
            formValues.items.map((product) => {
              return (
                <li>
                  {product.name +
                    ' - ' +
                    product.price +
                    '*' +
                    product.quantity}{' '}
                  + " = " + {product.total}
                </li>
              );
            })}
        </ul>
        {/* Total Price */}
        <Typography variant='h6'>Total Price: {formValues.total}</Typography>
      </Grid>
    </>
  );
};

export default ProductList;
