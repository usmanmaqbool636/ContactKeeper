import axios from 'axios';
let instance;
if (process.env.NODE_ENV !== "production") {
    instance = axios.create({
        baseURL: 'http://localhost:5000',
    });
}
else {
    instance = axios.create({
        baseURL: 'https://floating-plains-97468.herokuapp.com',
    });
}
export default instance;