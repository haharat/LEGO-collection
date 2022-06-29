import React, { useEffect } from "react";
import { listProjects } from "../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    Container,
    CssBaseline,
    CardMedia,
    CardContent,
    Grid,
    Typography,
    CardActionArea,
    CardActions
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Banner from './Banner';
import Sidebar from './Sidebar';
import Footer from './Footer';


const FilteredProjectList = ({ match }) => {
    const dispatch = useDispatch();
    const projectCategory = match.params.category

    const projectList = useSelector(state => state.projectList);
    const { loading, projects } = projectList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const filteredProjects = projects.filter((project) => project.category === projectCategory);

    const projectDelete = useSelector(state => state.projectDelete);
    const { success: successDelete } = projectDelete

    useEffect(() => {
        dispatch(listProjects());
    }, [dispatch, successDelete,])

    if (loading) return 'Loading';

    const theme = createTheme();

    return (
        <div className="filteredList">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header title="Lego" />
                    <main>
                        <Banner />
                        <Grid container spacing={2}>
                            <Grid item spacing={2} xs={3} sx={{ mt: 3 }}>
                                <Sidebar />
                            </Grid>
                            <Grid container xs={9} spacing={5}>
                                {filteredProjects.length > 0 ? filteredProjects.map((filteredProject) => (
                                    <Grid key={filteredProject.id} item xs={6} md={4}  >
                                        <CardActionArea component="a" href="#">
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                sx={{ display: { xs: 'none', sm: 'block' } }}
                                                image={filteredProject.cloudinary_url}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div">
                                                    {filteredProject.name}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`/projects/${filteredProject.id}`} className="card-link">Learn More</Link>
                                                {userInfo?.user.id === filteredProject.user_id &&
                                                    <Link to={`/projects/${filteredProject.id}/uploadImages`} className="card-link">Add pictures</Link>
                                                }
                                            </CardActions>
                                        </CardActionArea>
                                    </Grid>
                                ))
                                    : <h1>No Project Available</h1>
                                }
                            </Grid>
                        </Grid>
                    </main>
                </Container>
                <Footer
                    title="Footer"
                />
            </ThemeProvider>
        </div >
    )
}

export default FilteredProjectList;