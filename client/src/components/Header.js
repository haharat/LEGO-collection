import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";


function Header() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between' }}>
        <Box
          component="img"
          sx={{
            height: 40,
          }}
          src="/images/lego-title.jpg"
        />

        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {userInfo ? (
            <Box>
              <Typography>Welcome, {userInfo.user.username}</Typography>
              <Link to={`/`} onClick={handleLogout} className="nav-link active">Log Out</Link>
            </Box>

          ) : (
            <Box>

              <Button component={Link} to="/login" variant="outlined" color="primary" size="small">
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
     
    </React.Fragment>
  );
}

export default Header;