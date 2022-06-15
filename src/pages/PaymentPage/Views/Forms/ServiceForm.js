import React, { useEffect } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { useStateValue } from '../../StateContext';
import { Autocomplete } from '@material-ui/lab';

const ServiceForm = () => {
  const [{ formValues }, dispatch] = useStateValue();

  const [provinces, setProvinces] = React.useState([]);

  useEffect(() => {
    console.log({ formValues });
    setProvinces(provincesMock);
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6'>Additional data</Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        {/* Name */}
        <TextField
          required
          label='Receiver name'
          name='receiver_name'
          variant='outlined'
          fullWidth
          value={formValues.receiver_name}
          onChange={(e) =>
            dispatch({
              type: 'editFormValue',
              key: 'receiver_name',
              value: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        {/* Phone number */}
        <TextField
          required
          label='Receiver phone'
          name='receiver_name'
          variant='outlined'
          type='number'
          fullWidth
          value={formValues.receiver_phone}
          onChange={(e) =>
            dispatch({
              type: 'editFormValue',
              key: 'receiver_name',
              value: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        {/* Detail Address */}
        <TextField
          required
          label='Receiver address'
          name='receiver_address'
          variant='outlined'
          fullWidth
          value={formValues.receiver_address}
          onChange={(e) =>
            dispatch({
              type: 'editFormValue',
              key: 'receiver_address',
              value: e.target.value,
            })
          }
        />
      </Grid>
    </>
  );
};

export default ServiceForm;

const provincesMock = [
  {
    id: 1,
    name: 'Hà Nội',
  },
  {
    id: 2,
    name: 'TP Hồ Chí Minh',
  },
  {
    id: 3,
    name: 'Đà Nẵng',
  },
  {
    id: 4,
    name: 'Hải Phòng',
  },
];
