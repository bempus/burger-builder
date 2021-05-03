import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerToggler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <>
      <Toolbar isAuth={props.isAuthenticated} toggle={sideDrawerToggler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        toggle={sideDrawerToggler}
      />
      <main className={styles.Content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});
export default connect(mapStateToProps)(Layout);
