import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuiler/BurgerBuilder';
import * as actions from './store/actions';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = lazy(() => import('./containers/BurgerBuiler/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = (props) => {
  const { onTryAuthSignup } = props;
  useEffect(() => {
    onTryAuthSignup();
  }, [onTryAuthSignup]);
  const routes = props.isAuthenticated || localStorage.getItem('token') ? (
    <Switch>
      <Route path="/checkout" render={(props) => <Checkout {...props} />} />
      <Route path="/orders" render={(props) => <Orders {...props} />} />
      <Route path="/logout" render={(props) => <Logout {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to={props.authRedirectPath} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/checkout" render={(props) => <Checkout {...props} />} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to={props.authRedirectPath} />
    </Switch>
  );
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        {' '}
        {routes}
        {' '}
      </Suspense>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAuthSignup: () => dispatch(actions.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
