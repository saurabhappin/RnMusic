const initialState = {
  data: [],
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getAuthorization':
      return {...state, data: action.data};
    case 'ProductDetails':
      return {...state, data: action.data}
    default:
      return state;
  }
};

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'getContactDetails':
//       return {...state, data: action.data};

//     default:
//       return state;
//   }
// };

// export const addressReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'getAddressDetails':
//       return {...state, data: action.data};

//     default:
//       return state;
//   }
// };
