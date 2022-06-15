import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import {
  SentimentVerySatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons';
import StepperIcons from './StepperIcons';
import ProductList from './Forms/ProductList';
import PaymentForm from './Forms/PaymentForm';
import ServiceForm from './Forms/ServiceForm';
import {
  useStripe,
  useElements,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useStateValue } from '../StateContext';
import StepConnector from './StepConnector';
import {
  clientSecretPull,
  stripeDataObjectConverter,
  clientSecretDataObjectConverter,
} from '../constants/functions';

import MomoModal from './Modal/MomoModal';
import paymentApi from 'apis/paymentApi';
import mock from '../mock/order.json';
import { Link } from 'react-router-dom';

// OVERALL STYLE
const style = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  mainBox: {
    position: 'relative',
    marginTop: '-8px',
    padding: '10px 20px',
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
    background: theme.palette.background.default,
  },
  stepper: {
    height: 'calc(10vh - 40px)',
    minHeight: '55px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    justifyContent: 'flex-end',
  },
}));

const StepContent = ({ step }) => {
  switch (step) {
    case 0:
      return <ProductList />;
    case 1:
      return <ServiceForm />;
    case 2:
      return <PaymentForm />;
    default:
      return <></>;
  }
};

const Steppers = () => {
  const classes = style();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardStatus, setCardStatus] = useState(true);
  const [cardMessage, setCardMessage] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  let [{ formValues }, dispatch] = useStateValue();

  const [openMomoModal, setOpenMomoModal] = useState(false);

  useEffect(() => {
    // set mock for formValues
    // dispatch({
    //   type: 'SET_FORM_VALUES',
    //   payload: mock,
    // });
    formValues.items = mock[0].items;
    formValues.total = mock[0].total;
    formValues.receiver_address = mock[0].receiver_address;
    formValues.receiver_name = mock[0].receiver_name;
    formValues.receiver_phone = mock[0].receiver_phone;
  }, []);

  //Event Functions
  const handleNext = () => {
    if (activeStep === 2) {
      capture();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  const handleTimeout = () => {
    setActiveStep(0);
    setLoading(false);
    setCardStatus(true);
    setCardMessage('');
    setOpenMomoModal(false);
  };

  const handleOpenMomoModal = () => {
    setOpenMomoModal(true);
  };

  const handleCloseMomoModal = () => {
    setOpenMomoModal(false);
  };

  // Helpers FUNCTIONS
  const capture = async () => {
    console.log('capture');
    console.log(formValues);

    const paymentMethod = formValues.paymentmethod;

    if (paymentMethod == 'momo') {
      // setLoading(true);
      handleOpenMomoModal();
      return;
    } else {
      setLoading(true);
      const result = await paymentApi.payment(formValues);
      console.log(result);
      if (result.status === 200) {
        setLoading(false);
        setActiveStep(3);
      } else {
        setLoading(false);
        setCardStatus(false);
        setActiveStep(3);
        setCardMessage(result.message);
      }
    }
  };

  return (
    <>
      <Stepper
        alternativeLabel
        className={classes.stepper}
        connector={<StepConnector />}
        activeStep={activeStep}
      >
        {/* Change the number of loops here based on StepContent */}
        {[1, 2, 3].map((e) => (
          <Step key={e}>
            <StepLabel StepIconComponent={StepperIcons} />
          </Step>
        ))}
      </Stepper>
      <Box className={classes.mainBox}>
        {activeStep === 3 ? (
          <Grid
            container
            spacing={3}
            direction='column'
            justify='space-around'
            alignItems='center'
            style={{ height: '400px' }}
          >
            {cardStatus ? (
              <SentimentVerySatisfied fontSize='large' color='primary' />
            ) : (
              <SentimentVeryDissatisfied fontSize='large' color='error' />
            )}
            <Typography variant='h4'>{cardMessage}</Typography>
            <Button
              onClick={cardStatus ? handleReset : handleBack}
              className={classes.button}
            >
              {cardStatus ? 'Reset' : 'Back'}
            </Button>
          </Grid>
        ) : (
          <form
            autoComplete='off'
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <Grid container spacing={3}>
              <StepContent step={activeStep} />
              <Grid container item justify='flex-end'>
                <Button
                  disabled={activeStep === 0}
                  className={classes.button}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  type='submit'
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : activeStep === 2 ? (
                    'Pay'
                  ) : (
                    'Next'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      {/* Modals */}
      {openMomoModal && (
        <MomoModal
          open={openMomoModal}
          handleClose={handleCloseMomoModal}
          handleNext={handleNext}
          formValues={formValues}
          handleTimeout={handleTimeout}
        />
      )}
    </>
  );
};

export default Steppers;
