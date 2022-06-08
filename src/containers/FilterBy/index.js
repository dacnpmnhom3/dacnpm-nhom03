import React, { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { grey } from '@mui/material/colors';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton, Typography, Grid, Button, Stack } from '@mui/material';

import useStyles from './style';
import FilterCheckbox from 'components/Checkbox/FilterCheckBox';

const FilterBy = ({ title, options, onClose }) => {
  const [isShown, setIsShown] = useState(true);
  const defaultValues = options?.reduce(
    (prevVal, curVal) => ({ ...prevVal, [curVal.name]: false }),
    {},
  );
  const methods = useForm({ defaultValues });
  const classes = useStyles();

  const onSubmit = useCallback((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    methods.reset(data);
    onClose?.();
  }, []);

  const handleShowOption = useCallback(() => {
    setIsShown((prev) => !prev);
  }, []);

  return (
    <>
      <Grid container justifyContent={'space-between'} alignItems='center'>
        <Grid item>
          <Typography
            variant='h6'
            color='primary'
            component='div'
            fontWeight='bold'
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            className={isShown ? classes.showOptions : ''}
            onClick={handleShowOption}
          >
            <ArrowDropUpIcon />
          </IconButton>
        </Grid>
      </Grid>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{
            paddingBottom: '8px',
            marginBottom: '16px',
            display: isShown ? 'block' : 'none',
            borderBottom: `1px solid ${grey[300]}`,
          }}
        >
          {options.map((option) => (
            <FilterCheckbox
              key={option.id}
              label={option.name}
              total={option.total}
            />
          ))}
          <Stack mt={2} direction='row' justifyContent={'flex-end'}>
            <Button
              type='submit'
              variant='contained'
              disabled={
                !methods.formState.isDirty || !methods.formState.isDirty
              }
            >
              Apply
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};

export default FilterBy;
