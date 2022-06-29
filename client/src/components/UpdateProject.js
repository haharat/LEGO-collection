import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateProject } from "../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_UPDATE_RESET } from '../constants/projectConstants';
import axios from "axios";

import { Button, CssBaseline, TextField, InputLabel, Box, Typography, Container, MenuItem, Select, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UpdateProject = ({ match }) => {
    const dispatch = useDispatch();
    console.log("update project match", match)

    const projectId = match.params.id

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectCategory, setProjectCategory] = useState("");

    const projectUpdate = useSelector(state => state.projectUpdate);
    const { success, project } = projectUpdate
    console.log('Project update', projectUpdate)
    console.log("project", project)

    const history = useHistory();

    useEffect(() => {
        console.log("run use effect")
        const fetching = async () => {
            console.log("ready to fetch")
            const response = await axios.get(`/api/v1/projects/${projectId}`);
            const project = response.data.data.project;
            setProjectName(project.name);
            setProjectDescription(project.description);
            setProjectCategory(project.category);
        };

        fetching().catch(error => console.log(error));

    }, []);

    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedProject = {
            projectName: projectName,
            projectDescription: projectDescription,
            projectCategory: projectCategory,
        }
        dispatch(updateProject(projectId, updatedProject))
    };

    useEffect(() => {
        if (success) {
            history.push(`/projects/${projectId}`)
            dispatch({ type: PROJECT_UPDATE_RESET, payload: project })
        }
    }, [success])

    const theme = createTheme();

    return (
        <div className="updatePage">
            <ThemeProvider theme={theme}>
                <Paper
                    sx={{
                        position: 'relative',
                        color: '#fff',
                        mb: 4,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundImage: "url('https://images.unsplash.com/photo-1631106254201-ffbee2305c5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
                    }}
                >
                    <Container component="main" maxWidth="xs" >
                        <CssBaseline />
                        <Box component="form" onSubmit={handleUpdate} noValidate
                            sx={{
                                mt: 1, display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'white',
                            }}>
                            <Typography component="h1" variant="h5" color="#349beb">
                                Update Project
                            </Typography>
                            <InputLabel >
                                Project Title *
                            </InputLabel>
                            <TextField
                                margin="normal"
                                required
                                sx={{ width: '90%' }}
                                id="name"
                                onChange={(e) => setProjectName(e.target.value)} value={projectName}

                            />
                            <InputLabel >
                                Project Description *
                            </InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth

                                id="description"
                                multiline
                                rows={4}
                                sx={{ width: '90%' }}
                                onChange={(e) => setProjectDescription(e.target.value)} value={projectDescription}
                            />
                            <InputLabel id="demo-simple-select-label">Project Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                value={projectCategory}
                                label="projectCategory"
                                sx={{ width: '90%' }}
                                onChange={(e) => setProjectCategory(e.target.value)}
                            >
                                <MenuItem value="Animal">Animal</MenuItem>
                                <MenuItem value="Plant">Plant</MenuItem>
                                <MenuItem value="People">People</MenuItem>
                                <MenuItem value="Construction">Construction</MenuItem>
                                <MenuItem value="Vehicle">Vehicle</MenuItem>
                                <MenuItem value="Facility">Facility</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            <Box
                                component="span"
                                m={1}
                                display="flex"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                <Button
                                    component={Link}
                                    to={`/projects/${projectId}/uploadImages`}
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: '40%' }}
                                >
                                    Add More Pictures
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, width: '40%' }}
                                >
                                    Finish Update
                                </Button>
                            </Box>
                            <Button component={Link} to={'/projects'}
                                fullWidth
                                variant="contained"
                                sx={{ mb: 2, width: '90%' }}>Back to list
                            </Button>
                        </Box>
                    </Container>
                </Paper>
            </ThemeProvider>
        </div>
    );
};

export default UpdateProject;