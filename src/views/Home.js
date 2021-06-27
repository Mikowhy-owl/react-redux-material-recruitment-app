import {
  CircularProgress,
  Grid,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../components/image";
import TopBar from "../components/topBar";
import useImages from "../hooks/useImages";
import { setImagesPerPage, setPageNumber } from "../redux/actions";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.images.imagesArray);
  const showImagesState = useSelector((state) => state.images.showImages);
  const page = useSelector((state) => state.images.pageNumber);
  const imagesPerPage = useSelector((state) => state.images.imagesPerPage);

  const { isLoading, loadingError } = useImages({ imagesPerPage, page });

  const handleChangePage = (event, newPage) => {
    dispatch(setPageNumber(newPage));
  };

  const handleChangeImagesPerPage = (event) => {
    dispatch(setImagesPerPage(parseInt(event.target.value, 10)));
    dispatch(setPageNumber(0));
  };

  return (
    <Grid container className={classes.mainContainer}>
      <TopBar />
      <Grid item container justify="center">
        <Grid container item xs={10}>
          <Grid container justify="center">
            <Grid item>
              <Grid container justify="center" spacing={6}>
                {data?.length && !isLoading ? (
                  <>
                    {data.map((image) => (
                      <Image
                        image={image}
                        page={page}
                        showImagesState={showImagesState}
                      />
                    ))}
                  </>
                ) : (
                  <Grid container justify="center" spacing={10}>
                    <Grid item>
                      {loadingError ? (
                        <Typography variant="h6" color="error">
                          {loadingError}
                        </Typography>
                      ) : (
                        <CircularProgress />
                      )}
                    </Grid>
                  </Grid>
                )}
                {!loadingError ? (
                  <TablePagination
                    component="div"
                    count={-1}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={imagesPerPage}
                    onChangeRowsPerPage={handleChangeImagesPerPage}
                    rowsPerPageOptions={[6, 12, 21, 42]}
                    labelRowsPerPage="Per page"
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    mainContainer: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  })
);

export default Home;
