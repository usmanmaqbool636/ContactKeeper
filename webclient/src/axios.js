import axios from 'axios';
let instance;
instance = axios.create({
    baseURL: 'https://floating-plains-97468.herokuapp.com/',
});
export default instance;