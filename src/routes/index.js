import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import ProductList from 'pages/ProductList';
import PaymentPage from 'pages/PaymentPage';

const DefaultComponent = () => {
  return <Navigate to={Routes.home.path} />;
};

export const Routes = {
  signIn: {
    path: '/sign-in',
    element: SignInPage,
  },
  signUp: {
    path: '/sign-up',
    element: SignUpPage,
  },
  payment: {
    path: '/payment',
    element: PaymentPage,
  },
  products: {
    path: '/products',
    element: ProductList,
    routes: {
      laptop: {
        path: 'laptop',
        element: ProductList,
      },
      default: {
        path: '*',
        element: DefaultComponent,
      },
    },
  },
  home: {
    path: '/',
    element: HomePage,
    routes: {
      default: {
        path: '*',
        element: DefaultComponent,
      },
    },
  },
  default: {
    path: '*',
    element: DefaultComponent,
  },
};

const LoadingSpinner = () => {
  return <div>Loading</div>;
};

export function AppLoading(props) {
  return <Route path={props.path} element={<LoadingSpinner />} />;
}

export function RouteComponentWrapper(route, key, user, location) {
  if (!user?.isAuth && route.isAuth)
    return (
      <Route
        key={key}
        path={route.path}
        element={
          <Navigate to={Routes.signIn.path} state={{ from: location }} />
        }
      />
    );

  return (
    <Route path={route.path} element={<route.element />} key={key}>
      {route.index ? <Route index element={<route.index />} /> : undefined}
      {route.routes ? RenderRoutes(route.routes) : undefined}
    </Route>
  );
}

export function RenderRoutes(routes, user, location) {
  return Object.values(routes).map((route, index) => {
    return RouteComponentWrapper(route, index, user, location);
  });
}
