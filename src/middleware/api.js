const axios = require('axios');

const instanceAxios = axios.create({
  timeout: 2000,
});


const API_ROOT = 'http://127.0.0.1:3001/api';
export const  BASE_URL_PHOTO = 'http://127.0.0.1:3001/assets-img/';

/**
 * @param fetchApi get from server *
 */

const fetchApi = async (endpoint = '') => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const result = await instanceAxios.get(fullUrl).catch((error) => {
    if (error.response) {
      return { status: error.response.status };
    }
    return { status: 500 };
  });
  return result;
};


/**
 * @param postApi post into server
 */

const postApi = async (endpoint = '', values, config) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  console.log(fullUrl);
  const result = await instanceAxios.post(fullUrl, values, {headers: config}).catch((error) => {
    if (error.response) {
      return { status: error.response.status };
    }
  });
  return result;
};

  
export { fetchApi, postApi };