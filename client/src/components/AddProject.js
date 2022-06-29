import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createProject } from "../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_CREATE_RESET } from '../constants/projectConstants';

import { Button, CssBaseline, TextField, InputLabel, Box, Typography, Container, MenuItem, Select, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AddProject = () => {
    const dispatch = useDispatch();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectCategory, setProjectCategory] = useState("");
    
    const projectCreate = useSelector((state) => state.projectCreate)
    const { success, project } = projectCreate
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const history = useHistory();  

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(createProject({ projectName: projectName, projectDescription: projectDescription, projectCategory: projectCategory, projectUserId: userInfo.user.id }))
    };

    useEffect(() => {
        if (success) {
            history.push("/projects")
            dispatch({ type: PROJECT_CREATE_RESET, payload: project })
        }
    }, [success])

    const theme = createTheme();

    return (
        <div className="addPage">
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
                        <Box component="form" onSubmit={handleAdd} noValidate
                            sx={{
                                mt: 1, display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'white',
                            }}>
                            <Typography component="h1" variant="h5" color="#349beb">
                                Add Project
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
                                <MenuItem value="Scene">Scene</MenuItem>
                                <MenuItem value="Facility">Facility</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: '90%' }}
                            >
                                Add Project
                            </Button>
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
}

export default AddProject;