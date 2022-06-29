import * as React from 'react';
import { Link } from "react-router-dom";

import { Grid, Box, Typography, List, ListItem } from '@mui/material';

function Sidebar() {
  return (
    <Grid item xs={12} md={4} >

      <Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Categories
        </Typography>
        <List>
          <ListItem>
            <Link to={"/projects"} className="card-link">All</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/Animal/categories"} className="card-link">Animals</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/Plant/categories"} className="card-link">Plants</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/Construction/categories"} className="card-link">Constructions</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/Facility/categories"} className="card-link">Facilities</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/People/categories"} className="card-link">People</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/Vehicle/categories"} className="card-link">Vehicles</Link>
          </ListItem>
          <ListItem>
            <Link to={"/projects/Other/categories"} className="card-link">Others</Link>
          </ListItem>
        </List>
      </Box>

    </Grid>
  );
}

export default Sidebar;