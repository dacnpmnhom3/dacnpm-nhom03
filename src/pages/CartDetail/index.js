import React, { useEffect, useState } from 'react';

import {
  CircularProgress,
  Container,
  Stack,
  ButtonGroup,
  Button,
  Typography,
  IconButton,
  Box,
  Card,
  Grid,
  CardContent,
} from '@mui/material';
import Header from 'components/Header';
import { axiosClient } from 'apis';
const CartDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cartDetail, setCartDetail] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/api/product/`);

        if (response.status === 200) {
          setIsLoading(false);
          setCartDetail({ ...response.data.data });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsLoading(false);
      }
    };

    getProduct();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth='lg' sx={{ pt: 2 }}>
        {isLoading ? (
          <Stack alignItems='center' sx={{ mt: 6 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Card>
            <Grid
              container
              justifyContent={'space-between'}
              sx={{
                position: 'sticky',
                overflowX: 'hidden',
                overflowY: 'scroll',
              }}
            >
              <Grid item>
                <Typography>Name</Typography>
              </Grid>
              <Grid item>
                <Typography>Soluong</Typography>
              </Grid>
              <Grid item>
                <Typography>dongia</Typography>
              </Grid>
            </Grid>
            <CardContent>
              <Stack direction='row' justifyContent='space-between'>
                {/* anh,
            tensanpham,
            option
            dongia,
            soluong,
            tongtien,
            nutxoa */}
                <Box
                  component='img'
                  sx={{
                    height: '80px',
                    width: '80px',
                    display: 'block',
                    overflow: 'hidden',
                  }}
                  src={
                    'https://cdn.tgdd.vn/Products/Images/42/235838/Galaxy-S22-Ultra-Burgundy-600x600.jpg'
                  }
                  alt='illustration images for product'
                />
                <Typography>Samsung Galaxy S22 Ultra 5G</Typography>
                <Stack>
                  <Typography>Color: red</Typography>
                  <Typography>Capacity: 128GB</Typography>
                </Stack>
                <Typography>Don gia: 13.000.000d</Typography>
                <Typography>
                  So luong:
                  <ButtonGroup size='small' aria-label='small button group'>
                    <Button key='one'>-</Button>
                    <Button
                      key='one'
                      disableFocusRipple
                      disableElevation
                      disableTouchRipple
                    >
                      10
                    </Button>
                    <Button key='three'>+</Button>
                  </ButtonGroup>
                </Typography>
                <Typography>Total: 13.000.000d</Typography>
                <IconButton></IconButton>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};

export default CartDetail;
