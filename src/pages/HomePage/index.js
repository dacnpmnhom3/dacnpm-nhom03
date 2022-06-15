import React, { useEffect, useState } from 'react';

import { CircularProgress, Container, Stack } from '@mui/material';

import Header from 'components/Header';
import GroupProductsSlide from 'components/GroupProductsSlide';
import productApi from 'apis/productApi';
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState(null);

  useEffect(() => {
    const getListProduct = async () => {
      try {
        setIsLoading(true);
        const response = await productApi.getAll();

        if (response.status === 200) {
          setIsLoading(false);
          const data = response.data.data;
          const groupProductsName = Object.keys(data);
          const groupProducts = [];

          groupProductsName.forEach((name) => {
            console.log({name});
            groupProducts.push({
              groupName: name,
              products: [...data[name], ...data[name]],
            });
          });

          setListProduct(groupProducts);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsLoading(false);
      }
    };

    getListProduct();
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth='xl'>
        {isLoading ? (
          <Stack alignItems='center' sx={{ mt: 6 }}>
            <CircularProgress />
          </Stack>
        ) : (
          listProduct?.map((groupProducts, index) => (
            <GroupProductsSlide key={index} groupProducts={groupProducts} />
          ))
        )}
      </Container>
    </>
  );
};

export default HomePage;
