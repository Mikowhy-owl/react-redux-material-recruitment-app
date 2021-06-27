import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setImages } from "../redux/actions";

const useImages = ({ imagesPerPage, page }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      `https://picsum.photos/v2/list?page=${page + 1}&limit=${imagesPerPage}`
    )
      .then((res) => res.json())
      .then((res) => {
        dispatch(setImages(res));
        setLoadingError(null);
      })
      .catch(() => {
        dispatch(setImages(null));
        setLoadingError("There was an error loading data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, imagesPerPage, dispatch]);

  return { isLoading, loadingError };
};

export default useImages;
