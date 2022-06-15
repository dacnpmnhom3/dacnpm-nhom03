import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Stack,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Typography,
  CardContent,
  Card,
} from '@mui/material';

import { axiosClient } from 'apis';

import Header from 'components/Header';

import PropTypes from 'prop-types';
import ProductPropertyTable from 'components/Product/propertyTable';
import VariationsDisplayer from 'components/Product/variationsDisplayer';
import RelatedProduct from 'components/Product/RelatedProduct';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProductDetail = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState({
    category: '',
    _id: '',
    description: '',
    thumbnails: '',
    createdAt: '',
    properties: [],
    name: '',
    variations: [],
    discount_id: {},
    store_id: {},
  });
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/api/product/${productId}`);

        if (response.status === 200) {
          setIsLoading(false);
          setProduct({ ...response.data.data });
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
          <>
            <VariationsDisplayer
              category={product.category.split('>')}
              productName={product.name}
              variations={product.variations}
              promotion={product.discount_id}
              store={product.store_id}
              productId={product._id}
            />
            <Box sx={{ width: '100%' }} marginY={2}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabIndex}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                  variant='fullWidth'
                >
                  <Tab
                    // icon={<PhoneMissedIcon />}
                    iconPosition='start'
                    label='Overview'
                    {...a11yProps(0)}
                  />
                  <Tab label='Specs' {...a11yProps(1)} />
                  <Tab label='Reviews' {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={tabIndex} index={0}>
                <Card>
                  <CardContent>
                    <Typography>{product.description}</Typography>
                  </CardContent>
                </Card>
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <ProductPropertyTable properties={product.properties} />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                Reviews appear hear!
              </TabPanel>
            </Box>
            <RelatedProduct productId={''} />
          </>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
