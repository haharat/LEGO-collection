import * as React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Paper, Typography, Grid, Box, Button } from '@mui/material';

function Banner() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: "url('https://images.pexels.com/photos/7662317/pexels-photo-7662317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />


      <Box
        direction="column" align="center"
        justifyContent="center"
        sx={{
          position: 'relative',
          p: { xs: 9, md: 15 },
        }}
      >

        <Grid container direction="column" align="center">
          <Grid item direction="row" md={4}
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography variant="h5" color="inherit" paragraph>
              Where the fun begins
            </Typography>
            {userInfo &&
              <Button component={Link} to="/addProject" variant="contained" color="primary">
                Add a New Project
              </Button>
            }
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default Banner;