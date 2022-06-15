import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStateValue } from '../../StateContext';

const ProductList = () => {
  const [{ formValues }] = useStateValue();

  console.log({ formValues });

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6'>Your choosen Products</Typography>
      </Grid>
      <Grid item xs={12}>
        <ul>
          {formValues.items != null &&
            formValues.items.map((product, index) => {
              return (
                <li key={index}>
                  {/* {product.name +
                    ' - ' +
                    product.price +
                    '*' +
                    product.quantity}{' '}
                  + " = " + {product.total} */}
                  {`${product.name} - ${product.price} * ${product.quantity} = ${product.total}`}
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
