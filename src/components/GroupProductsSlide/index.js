import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';
import { Navigation } from 'swiper';

import { Typography, Grid, Button, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Product from 'components/Product';
import { Routes } from 'routes';

const GroupProductsSlide = ({ groupProducts }) => {
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const matchBetweenSmLg = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const navigate = useNavigate();

  const handleRedirect = useCallback(() => {
    navigate(Routes.products.path + '/' + groupProducts.groupName);
  }, []);

  return (
    <div style={{ marginTop: 16 }}>
      <Grid container justifyContent={'space-between'} alignItems='center'>
        <Grid item>
          <Typography
            sx={{
              fontSize: {
                xs: '16px',
                sm: '32px',
              },
              color: '#0F5B9A',
              fontWeight: 'bold',
              textAlign: 'left',
              textTransform: 'uppercase',
            }}
          >
            {groupProducts.groupName}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            size='large'
            endIcon={<ArrowForwardIosIcon />}
            onClick={handleRedirect}
          >
            View all
          </Button>
        </Grid>
      </Grid>
      <Swiper
        navigation={true}
        spaceBetween={16}
        modules={[Navigation]}
        slidesPerView={matchUpSm ? (matchBetweenSmLg ? 3 : 6) : 2}
        slidesPerGroup={matchUpSm ? (matchBetweenSmLg ? 3 : 6) : 2}
      >
        {groupProducts.products.map((product, index) => (
          <SwiperSlide key={index} style={{ width: '100%' }}>
            <Stack style={{ width: 'inherit' }}>
              <Product productInfo={product} />
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GroupProductsSlide;
