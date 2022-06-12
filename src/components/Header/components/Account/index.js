import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

// import SecondaryButton from 'components/Button/SecondaryButton';
import useStyles from './styles';
import { Routes } from 'routes';
import SecondaryButton from 'components/Button/SecondaryButton';

const Account = () => {
  const classes = useStyles();
  const userInfo = '';
  const navigate = useNavigate();

  const onRedirectSignInPage = useCallback(() => {
    navigate(Routes.signIn.path);
  }, []);

  const onRedirectSignUpPage = useCallback(() => {
    navigate(Routes.signUp.path);
  });

  if (userInfo) {
    return (
      <Stack
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        spacing={2}
      >
        <AccountCircleOutlinedIcon fontSize='large' />
        <Typography>username</Typography>
      </Stack>
    );
  } else {
    return (
      <Stack direction='row' spacing={2}>
        <SecondaryButton onClick={onRedirectSignInPage}>
          Sign in
        </SecondaryButton>
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.signUpBtn}
          onClick={onRedirectSignUpPage}
        >
          Sign up
        </Button>
      </Stack>
    );
  }
};

export default Account;
