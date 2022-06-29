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


const ProjectList = () => {
    const dispatch = useDispatch();

    const projectList = useSelector(state => state.projectList);
    const { loading, projects } = projectList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(listProjects());
    }, [dispatch])

    if (loading) return 'Loading';

    const theme = createTheme();

    return (
        <div className="projectList">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header title="Lego" />
                    <main>
                        <Banner />

                        <Grid container spacing={2}>
                            <Grid item xs={3} >
                                <Sidebar />
                            </Grid>

                            <Grid container xs={9} spacing={5} alignItems="stretch">

                                {projects.length > 0 ? projects.map((project) => (
                                    <Grid key={project.id} item xs={6} md={4} >
                                        <CardActionArea component="a" href="#" style={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                height="200"

                                                sx={{ display: { xs: 'none', sm: 'block' } }}
                                                image={project.cloudinary_url}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h9" component="div" sx={{ fontWeight: 600 }}>
                                                    {project.name}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`/projects/${project.id}`} className="card-link">Learn More</Link>
                                                {userInfo?.user.id ===  project.user_id &&
                                                    < Link to={`/projects/${project.id}/uploadImages`} className="card-link">Add pictures</Link>
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

export default ProjectList;