import React from 'react';

import { Button } from '@mui/material';

import useStyles from './styles';

const SecondaryButton = ({ onClick, children }) => {
  const classes = useStyles();

  return (
    <Button
      variant='contained'
      color='secondary'
      size='large'
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
