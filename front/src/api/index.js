import axios from 'axios';

export default axios.create({
  baseURL: 'thetree-thelink.herokuapp.com/',
  timeout: 3000,
});
