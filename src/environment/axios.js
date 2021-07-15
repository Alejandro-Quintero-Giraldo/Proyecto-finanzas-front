import axios from "axios";

export default axios.create({ baseURL: 'https://topfinances.herokuapp.com/api/' });