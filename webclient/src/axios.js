import axios from 'axios';
let instance = axios;
// if (process.env.NODE_ENVV === 'dev') {
//     instance = axios.create({
//         baseURL: 'http://localhost:5000/',
//     });
// }
export default instance;