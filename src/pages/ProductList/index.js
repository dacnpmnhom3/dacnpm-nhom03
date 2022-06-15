import React, { useCallback, useEffect, useState } from 'react';

import {
  Grid,
  Stack,
  Button,
  Popover,
  Container,
  Pagination,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';

import { axiosClient } from 'apis';

import Header from 'components/Header';
import Product from 'components/Product';
import FilterBy from 'containers/FilterBy';
import PriceRange from 'containers/PriceRange';

const manufacturer = {
  title: 'Manufacturer',
  itemList: [
    {
      id: 1,
      name: 'ACER',
      total: 10,
    },
    {
      id: 2,
      name: 'ASUS',
      total: 10,
    },
    {
      id: 3,
      name: 'DELL',
      total: 30,
    },
    {
      id: 4,
      name: 'MSI',
      total: 4,
    },
    {
      id: 5,
      name: 'HP',
      total: 25,
    },
  ],
};

const memoryStandard = {
  title: 'Memory standard',
  itemList: [
    {
      id: 1,
      name: 'DDR5',
    },
    {
      id: 2,
      name: 'DDR4',
    },
    {
      id: 3,
      name: 'DDR3',
    },
  ],
};

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState(null);
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up('sm'));

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const handleChange = useCallback((e, value) => {
    setPage(value);
  }, []);

  const handleClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    const getListProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`api/product`);

        if (response.status === 200) {
          setIsLoading(false);
          const data = response.data.data;
          const groupProductsName = Object.keys(data);
          const groupProducts = [];

          groupProductsName.forEach((name) => {
            groupProducts.push(...data[name]);
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
      <Container maxWidth='xl' sx={{ pt: 2 }}>
        <Stack
          mb={3}
          spacing={1}
          direction={matchUpSm ? 'row' : 'column'}
          alignItems={matchUpSm ? 'center' : 'flex-start'}
        >
          <Typography variant='h5' color='primary' fontWeight='bold'>
            Search results: &ldquo;asus&rdquo;
          </Typography>
          <Typography variant='h6' color={grey[600]}>
            (15 results)
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {matchUpSm ? (
            <Grid item sm={4} md={3}>
              <PriceRange />
              <FilterBy
                title={manufacturer.title}
                options={manufacturer.itemList}
              />
              <FilterBy
                title={memoryStandard.title}
                options={memoryStandard.itemList}
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <Button
                  variant='outlined'
                  startIcon={<FilterListIcon />}
                  onClick={handleClick}
                >
                  Filter
                </Button>
              </Grid>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Stack sx={{ p: 2, width: 'calc(100vw - 64px)' }}>
                  <PriceRange onClose={handleClose} />
                  <FilterBy
                    title={manufacturer.title}
                    options={manufacturer.itemList}
                    onClose={handleClose}
                  />
                  <FilterBy
                    title={memoryStandard.title}
                    options={memoryStandard.itemList}
                    onClose={handleClose}
                  />
                </Stack>
              </Popover>
            </>
          )}
          <Grid item sm={8} md={9}>
            {isLoading ? (
              <Stack alignItems='center' sx={{ mt: 6 }}>
                <CircularProgress />
              </Stack>
            ) : (
              <>
                <Grid container spacing={{ xs: '4px', sm: 2 }}>
                  {listProduct?.map((product, index) => (
                    <Grid item key={index} xl={3} md={4} sm={6} xs={6}>
                      <Product productInfo={product} />
                    </Grid>
                  ))}
                </Grid>
                <Stack alignItems='center'>
                  <Pagination
                    count={10}
                    page={page}
                    size='large'
                    sx={{ my: 2 }}
                    color='primary'
                    onChange={handleChange}
                  />
                </Stack>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductList;
