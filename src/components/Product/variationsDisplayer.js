/* eslint-disable no-unused-vars */
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Typography,
  Stack,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Avatar,
  Link,
} from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PriceFormat from 'components/PriceFormat';
import React from 'react';
import { useState, useEffect } from 'react';
import ImagesCarousel from './imageCarousel';
import { axiosClient } from 'apis';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMsg, setSuccessMsg } from 'store/alert';
import { Routes } from 'routes';
import { useNavigate } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function VariationsDisplayer({
  category,
  productId,
  productName,
  variations,
  promotion,
  store,
}) {
  const [variationInfo, setVariationInfo] = useState({ images: [] });
  const [options, setOptions] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (variations.length) {
      const obj = variations.reduce((accum, element) => {
        element.variation_attributes.forEach((attribute) => {
          const variationName = attribute.variation_name;
          const value = attribute.value;
          if (accum[variationName] === undefined)
            accum[variationName] = [value];
          else if (!accum[variationName].includes(value))
            accum[variationName].push(value);
        });
        return accum;
      }, {});
      console.log({ obj });
      setOptions(obj);
      setVariationInfo(variations[0]);
    } else {
      console.log({ variations });
    }
  }, [variations]);

  const handleChange = (event) => {
    const currentOptions = [
      ...JSON.parse(JSON.stringify(variationInfo.variation_attributes)),
    ];
    for (let i = 0; i < currentOptions.length; i++) {
      if (currentOptions[i].variation_name === event.target.name) {
        currentOptions[i].value = event.target.value;
        break;
      }
    }
    //find the variation that match currentOptions
    const foundVariation = variations.find((element) => {
      const str_element = element.variation_attributes
        .map((ele1) => JSON.stringify({ ...ele1, _id: '' }))
        .join('');
      const str_option = currentOptions
        .map((ele2) => JSON.stringify({ ...ele2, _id: '' }))
        .join('');
      return str_element === str_option;
    });
    setVariationInfo(foundVariation);
  };

  const handleAddToCartBtn = async () => {
    //login? if not redirect to login page
    if (!isAuthenticated) navigate(Routes.signIn.path);
    //send userid, productid, productvariationid, quantity
    try {
      const quantity = document.getElementById('product-quantity').value;
      const response = await axiosClient.post(`/api/cart/add-product`, {
        user_id: JSON.parse(user).id,
        product_id: productId,
        product_variation_id: variationInfo._id,
        quantity: quantity,
      });

      dispatch(setSuccessMsg(response.data.data.message));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item lg={7} md={7} xs={12}>
        <ImagesCarousel images={variationInfo.images} />
      </Grid>
      <Grid item lg={5} md={5} xs={12}>
        <Breadcrumbs aria-label='breadcrumb'>
          <StyledBreadcrumb
            component='a'
            href='#'
            label='Home'
            icon={<HomeIcon fontSize='small' />}
          />
          {category.map((element, index) => (
            <StyledBreadcrumb
              key={index}
              component='a'
              href='#'
              label={element}
            />
          ))}
        </Breadcrumbs>
        <Stack
          direction='row'
          alignItems='center'
          // justifyContent="space-between"
          marginTop={1}
        >
          <Avatar src={store.store_image} variant='rounded' />
          <Link href='#'>{store.store_name}</Link>
        </Stack>
        <Typography variant='h4' marginY={1}>
          {productName}
        </Typography>
        <FormControl>
          {Object.keys(options).map((key, index) => (
            <React.Fragment key={index}>
              <FormLabel id={'demo-row-radio-buttons-group-label' + index}>
                {key}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby={'demo-row-radio-buttons-group-label' + index}
                name={key}
                defaultValue={options[key][0]}
                onChange={handleChange}
              >
                {options[key].map((variationValue, ind) => (
                  <FormControlLabel
                    value={variationValue}
                    control={<Radio />}
                    label={variationValue}
                    key={ind}
                  />
                ))}
              </RadioGroup>
            </React.Fragment>
          ))}
        </FormControl>
        <Stack marginY={1}>
          <Typography>Available Stock: {variationInfo.stock} </Typography>
          <Stack
            direction='row'
            spacing={0.5}
            display='flex'
            alignItems='center'
          >
            <Typography>Price:</Typography>
            <Typography
              sx={{ fontSize: '20px', fontWeight: 'bold' }}
              component='div'
            >
              <PriceFormat
                price={
                  promotion
                    ? variationInfo.price *
                      ((100 - promotion.discount_percent) / 100)
                    : variationInfo.price
                }
              />
            </Typography>
            {promotion ? (
              <>
                <Typography
                  sx={{
                    textAlign: 'left',
                    color: '#666666',
                    textDecoration: 'line-through',
                    fontSize: '16px',
                  }}
                  component='div'
                >
                  <PriceFormat price={variationInfo.price} />
                </Typography>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color='inherit'>{promotion.name}</Typography>
                      <Typography color='inherit' fontStyle='italic'>
                        {promotion.description}
                      </Typography>
                      <Typography
                        color='inherit'
                        sx={{ textDecoration: 'underline' }}
                      >
                        {`${promotion.discount_percent}% off`}
                      </Typography>
                    </React.Fragment>
                  }
                  placement='right'
                >
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </Stack>
        </Stack>
        <Stack direction='row' display='flex' alignItems='center' spacing={1}>
          <Typography>Amount:</Typography>
          <TextField
            id='product-quantity'
            type='number'
            defaultValue={1}
            variant='standard'
            InputProps={{
              inputProps: {
                max: variationInfo.stock,
                min: 0,
              },
            }}
          />
          <Button
            variant='contained'
            startIcon={<ShoppingCartOutlinedIcon />}
            onClick={handleAddToCartBtn}
          >
            Add to cart
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
