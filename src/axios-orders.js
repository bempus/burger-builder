import Axios from 'axios';

const orders = Axios.create({
  baseURL: process.env.REACT_APP_ORDER_API_URL,
});

export default orders;
