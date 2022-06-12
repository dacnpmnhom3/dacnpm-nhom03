import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Grid,
  Stack,
  Button,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import useStyles from './style';

const PriceRange = ({ onClose }) => {
  const [isShown, setIsShown] = useState(true);
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm();
  const classes = useStyles();

  const onSubmit = useCallback((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    reset(data);
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
            Price range
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          paddingBottom: '8px',
          marginBottom: '16px',
          display: isShown ? 'block' : 'none',
          borderBottom: `1px solid ${grey[300]}`,
        }}
      >
        <Stack direction='row' alignItems={'center'} spacing={2}>
          <Controller
            defaultValue=''
            name='startPrice'
            control={control}
            render={({ field }) => <TextField {...field} variant='outlined' />}
          />
          <Typography>to</Typography>
          <Controller
            defaultValue=''
            name='endPrice'
            control={control}
            render={({ field }) => <TextField {...field} variant='outlined' />}
          />
        </Stack>
        <Stack mt={2} direction='row' justifyContent={'flex-end'}>
          <Button
            type='submit'
            variant='contained'
            disabled={!isDirty || !isDirty}
          >
            Apply
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default PriceRange;
