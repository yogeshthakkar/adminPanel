const initState = {
  isLoading: false,
};

const LayoutReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload.data,
      };
    default:
      return { ...state };
  }
};

export default LayoutReducer;
