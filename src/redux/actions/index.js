export const setImages = (imagesArray) => ({
  type: "SET_IMAGES",
  payload: {
    imagesArray,
  },
});

export const showImages = (show) => ({
  type: "SHOW_IMAGES",
  payload: {
    show,
  },
});

export const setPageNumber = (pageNumber) => ({
  type: "SET_PAGE_NUMBER",
  payload: {
    pageNumber,
  },
});

export const setImagesPerPage = (imagesPerPage) => ({
  type: "SET_IMAGES_PER_PAGE",
  payload: {
    imagesPerPage,
  },
});
