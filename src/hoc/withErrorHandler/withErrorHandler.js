import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => (props) => {
  const [error, clearError] = useHttpErrorHandler(axios);
  return (
    <>
      <Modal show={error} modalClose={clearError}>
        {error && error.message}
      </Modal>
      <WrappedComponent {...props} />
    </>
  );
};
export default withErrorHandler;
