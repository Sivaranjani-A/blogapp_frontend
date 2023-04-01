import axios from "axios";


const URL = 'https://blogapp-mkye.onrender.com'
// const URL = 'http://localhost:4000'

export default axios.create({
  baseURL: URL,
});
