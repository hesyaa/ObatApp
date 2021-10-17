const initialState = {
  user: [],
  isLogin: false,
  currentUser: 'Default',
  userSignup: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER-LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    case 'CURRENT-USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'SIGNUP-ACCOUNT':
      return {
        ...state,
        userSignup: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
