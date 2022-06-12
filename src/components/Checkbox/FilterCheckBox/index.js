import React from 'react';

import {
  Grid,
  Checkbox,
  FormGroup,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { useFormContext, Controller } from 'react-hook-form';

const FilterCheckbox = ({ label, total }) => {
  const { control } = useFormContext();

  return (
    <FormGroup>
      <Grid container alignItems='center' justifyContent={'space-between'}>
        <Controller
          name={label}
          control={control}
          // defaultValue={false}
          render={({ field }) => (
            <Grid item {...field}>
              <FormControlLabel control={<Checkbox />} label={label} />
            </Grid>
          )}
        />
        {total && (
          <Grid item>
            <Typography color={grey[500]}>({total})</Typography>
          </Grid>
        )}
      </Grid>
    </FormGroup>
  );
};

export default FilterCheckbox;
