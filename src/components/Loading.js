import { CircularProgress, Grid } from "@mui/material";

const LoadingPage = () => {

  return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >

            <Grid item xs={3}>
                <CircularProgress></CircularProgress>
            </Grid>   
        
        </Grid> 
  );
};

export default LoadingPage;