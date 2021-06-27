import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useImage = ({ imageId }) => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  const images = useSelector((state) => state.images.imagesArray);

  useEffect(() => {
    const isActualImageInStore = images.find((x) => x.id === imageId);

    setIsLoading(true);

    if (isActualImageInStore) {
      setImageData(isActualImageInStore);
      setLoadingError(null);
      setIsLoading(false);
    } else {
      getImage();
    }
  }, [imageId, images]);

  const getImage = () => {
    fetch(`https://picsum.photos/id/${imageId}/info`)
      .then((res) => res.json())
      .then((res) => {
        setLoadingError(null);
        setImageData(res);
      })
      .catch(() => {
        setLoadingError(
          "There was problem fetching data or there is no image with that id. Try again."
        );
        setImageData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { imageData, isLoading, loadingError };
};

export default useImage;
