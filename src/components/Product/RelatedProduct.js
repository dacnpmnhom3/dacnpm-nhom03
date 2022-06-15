/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'components/GroupProductsSlide/style.css';
import { Navigation } from 'swiper';

import Product from 'components/Product';

export default function RelatedProduct({ productId }) {
  const [values, setValues] = useState([
    {
      name: 'San Francisco – Oakland Bay Bridge, United States',
      thumbnails:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bird',
      thumbnails:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bali, Indonesia',
      thumbnails:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      price: 13000000,
    },
    {
      name: 'Goč, Serbia',
      thumbnails:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'San Francisco – Oakland Bay Bridge, United States',
      thumbnails:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bird',
      thumbnails:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bali, Indonesia',
      thumbnails:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      price: 13000000,
    },
    {
      name: 'Goč, Serbia',
      thumbnails:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'San Francisco – Oakland Bay Bridge, United States',
      thumbnails:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bird',
      thumbnails:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bali, Indonesia',
      thumbnails:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      price: 13000000,
    },
    {
      name: 'Goč, Serbia',
      thumbnails:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
    {
      name: 'Bali, Indonesia',
      thumbnails:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
      price: 13000000,
    },
    {
      name: 'Goč, Serbia',
      thumbnails:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      price: 13000000,
    },
  ]);
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const matchBetweenSmLg = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  useEffect(() => {
    //setValues([...variations]);
  }, [productId]);

  return (
    <Stack>
      <Typography padding='8px' variant='h5'>
        Related Products
      </Typography>
      <Swiper
        navigation={true}
        spaceBetween={16}
        modules={[Navigation]}
        slidesPerView={matchUpSm ? (matchBetweenSmLg ? 3 : 6) : 2}
        slidesPerGroup={matchUpSm ? (matchBetweenSmLg ? 3 : 6) : 2}
      >
        {values.map((product, index) => (
          <SwiperSlide key={index} style={{ width: '100%' }}>
            <Stack style={{ width: 'inherit' }}>
              <Product productInfo={product} />
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
}
