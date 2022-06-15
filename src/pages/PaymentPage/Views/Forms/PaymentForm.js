import React from 'react'; //, {useState }
import { Grid, Typography } from '@material-ui/core';

import { useStateValue } from '../../StateContext';

const paymentMethod = [
  {
    value: 'cash',
    label: 'By Cash',
    logo: 'https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg',
  },
  {
    value: 'momo',
    label: 'Momo',
    logo: 'https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg',
  },
];

const PaymentForm = () => {
  const [, dispatch] = useStateValue();
  // console.log({ formValues })

  const handleChange = (event) => {
    console.log(event.target.value);

    dispatch({
      type: 'editFormValue',
      key: 'paymentmethod',
      value: event.target.value,
    });
  };
  return (
    <>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h6'>Choose Payment Method</Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          {paymentMethod.map((method) => {
            return (
              <>
                <input
                  type='radio'
                  name='paymentmethod'
                  value={method.value}
                  onChange={handleChange}
                />
                <img src={method.logo} alt={method.label} style={styles.logo} />
                <label> {method.label}</label>
                <div></div>
              </>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;

const styles = {
  logo: {
    with: '30px',
    height: '30px',
    marginRight: '10px',
    position: 'relative',
    top: '10px',
  },
};
