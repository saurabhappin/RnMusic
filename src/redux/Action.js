import axios from 'axios';

const qs = require('qs');
const data = qs.stringify({
  grant_type: 'client_credentials',
  client_id: '5a1fe97becfa4f53869a4c1037f41940',
  client_secret: 'd7ea3348df0646798d405b8c2df47c56',
});

const baseUrl = 'https://accounts.spotify.com/api/';
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: baseUrl + 'token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: data,
};
export const getAuthorization = () => {
  //API hit
  return async dispatch => {
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        const token = response.data;
        dispatch({
          type: 'getAuthorization',
          data: token,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

// export const getContactDetails = () => {
//   //API hit
//   return dispatch => {
//     axios
//       .get('https://random-data-api.com/api/v2/users')
//       .then(response => {
//         const users = response.data;
//         dispatch({
//           type: 'getContactDetails',
//           data: users,
//         });
//       })
//       .catch(err => console.log(err));
//   };
// };

// export const getAddressDetails = () => {
//   //API hit
//   return dispatch => {
//     axios
//       .get('https://random-data-api.com/api/v2/addresses')
//       .then(response => {
//         const users = response.data;
//         dispatch({
//           type: 'getAddressDetails',
//           data: users,
//         });
//       })
//       .catch(err => console.log(err));
//   };
// };

export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products/category/smartphones');
    console.log('Product api response ======>', response?.data?.products);
    dispatch({
      type: 'ProductDetails',
      data: response?.data?.products,
    })
    // setProducts(response.data.products);
  } catch (error) {
    console.error(error);
  }
};