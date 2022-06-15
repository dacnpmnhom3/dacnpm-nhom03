import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';

// import {
//   deleteCart,
//   onNextStep,
//   applyDiscount,
//   increaseQuantity,
//   decreaseQuantity
// } from '../../../../redux/slices/product';
// routes
// import { PATH_DASHBOARD } from '../../../../routes/paths';
//
// import Scrollbar from '../../../Scrollbar';
// import EmptyContent from '../../../EmptyContent';
// import CheckoutSummary from './CheckoutSummary';
// import CheckoutProductList from './CheckoutProductList';
import Header from 'components/Header';
import Scrollbar from '../../components/Scrollbar';
import CheckoutSummary from '../../components/CheckoutCart/CheckoutSummary';
import CheckoutProductList from '../../components/CheckoutCart/CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const checkout =
  {
    "activeStep": 0,
    "cart": [
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "name": "Samsung Galaxy S22 Ultra 5G",
        "cover": "https://cdn.tgdd.vn/Products/Images/42/235838/Galaxy-S22-Ultra-Burgundy-600x600.jpg",
        "available": 88,
        "price": 30990000,
        "color": "#FFFFFF",
        "quantity": 2,
        "subtotal": 30990000
      },
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
        "name": "iPad Pro M1 12.9 inch 5G",
        "cover": "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-2021-129-inch-gray-600x600.jpg",
        "available": 50,
        "price": 34990000,
        "color": "#FFFFFF",
        "quantity": 1,
        "subtotal": 34990000
      },
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
        "name": "Tai nghe Bluetooth Chụp Tai Kanen K6",
        "cover": "https://cdn.tgdd.vn/Products/Images/54/187374/tai-nghe-bluetooth-kanen-k6-thumb-600x600.jpeg",
        "available": 2,
        "price": 480000,
        "color": "#00AB55",
        "quantity": 1,
        "subtotal": 480000
      }
    ],
    "subtotal": 97450000,
    "total": 9745000,
    "discount": 0,
    "shipping": 0,
    "billing": null
  };
  
  const { cart, total, discount, subtotal } = checkout;
  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));

  return (
    <>
      <Header/>
      <FormikProvider value={formik} sx={{ my: 2 }}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Card
                      <Typography component="span" sx={{ color: 'text.secondary' }}>
                        &nbsp;({totalItems} item)
                      </Typography>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />

                {!isEmptyCart ? (
                  <Scrollbar>
                    <CheckoutProductList
                      formik={formik}
                      onDelete={handleDeleteCart}
                      onIncreaseQuantity={handleIncreaseQuantity}
                      onDecreaseQuantity={handleDecreaseQuantity}
                    />
                  </Scrollbar>
                ) : (
                  <EmptyContent
                    title="Cart is empty"
                    description="Look like you have no items in your shopping cart."
                    img="/static/illustrations/illustration_empty_cart.svg"
                  />
                )}
              </Card>

              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                startIcon={<Icon icon={arrowIosBackFill} />}
              >
                Continue Shopping
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <CheckoutSummary
                total={total}
                enableDiscount
                discount={discount}
                subtotal={subtotal}
                onApplyDiscount={handleApplyDiscount}
              />
              <Button fullWidth size="large" type="submit" variant="contained" disabled={values.products.length === 0}>
                Check Out
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
