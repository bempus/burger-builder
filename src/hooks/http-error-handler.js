import { useState, useEffect } from 'react';

const ErrorHandler = (httpClient) => {
  const [error, setError] = useState(null);
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    },
  );

  const { interceptors } = httpClient;
  useEffect(() => () => {
    interceptors.request.eject(reqInterceptor);
    interceptors.response.eject(resInterceptor);
  }, [reqInterceptor, resInterceptor, interceptors]);

  const clearError = () => {
    setError(null);
  };

  return [error, clearError];
};

export default ErrorHandler;
