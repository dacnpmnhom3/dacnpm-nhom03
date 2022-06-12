import React from 'react';

import NumberFormat from 'react-number-format';

const PriceFormat = ({ price }) => {
  return (
    <NumberFormat
      suffix={'₫'}
      displayType={'text'}
      thousandSeparator={true}
      value={price}
      renderText={(value, props) => <div {...props}>{value}</div>}
    />
  );
};

export default PriceFormat;
