import React from 'react';

import { StateProvider } from './StateContext';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme';

import Header from './Views/Header';
import Main from './Views/Main';
import LegalNoticePopup from './Views/LegalNoticePopups/LegalNoticePopup';

// import Header from 'components/Header';
const PaymentPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StateProvider>
          <div style={{ flexGrow: 1 }}>
            <Header
              title='PAYMENT FORM'
              logoLink='https://c1.neweggimages.com/WebResource/Themes/Nest/logos/Newegg_full_color_logo_RGB.SVG'
            />
            <Main />
            {/* <Footer /> */}
          </div>
          <LegalNoticePopup />
        </StateProvider>
      </ThemeProvider>
    </>
  );
};

export default PaymentPage;
