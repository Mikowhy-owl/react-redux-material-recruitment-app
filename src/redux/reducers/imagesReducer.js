const imagesReducer = (
  state = {
    imagesArray: [],
    showImages: true,
    pageNumber: 0,
    imagesPerPage: 6,
  },
  action
) => {
  switch (action.type) {
    case "SET_IMAGES":
      if (action.payload.imagesArray) {
        return { ...state, imagesArray: [...action.payload.imagesArray] };
      } else return { ...state, imagesArray: [] };
    case "SHOW_IMAGES":
      return { ...state, showImages: !state.showImages };
    case "SET_PAGE_NUMBER":
      return { ...state, pageNumber: action.payload.pageNumber };
    case "SET_IMAGES_PER_PAGE":
      return { ...state, imagesPerPage: action.payload.imagesPerPage };
    default:
      return state;
  }
};

export default imagesReducer;
