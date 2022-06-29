import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail, deleteProject, deleteImage, listProjects } from "../actions/projectActions";
import { Image } from 'cloudinary-react';
import { Link } from "react-router-dom";

import { Container, CssBaseline, Typography, Button, Box, Paper, CircularProgress, IconButton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';


const ProjectDetail = ({ match }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const projectId = match.params.id

  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, error, project } = projectDetails; 

  const imageDelete = useSelector((state) => state.imageDelete)
  const { loading:imageDeleteLoading, result} = imageDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleImageDelete = async (cloudinaryId) => {
    dispatch(deleteImage(cloudinaryId))
    dispatch(getProjectDetail(projectId))
  }

  const handleDelete = (id) => {
    dispatch(deleteProject(id))
    dispatch(listProjects())
  }
  useEffect(() => {
    if (projectId) {
      dispatch(getProjectDetail(projectId))
    }
    if(result?.deleteResult?.command==='DELETE'&& result?.deleteResult?.rowCount>0){
      dispatch(getProjectDetail(projectId))
      console.log("image delete result",result)
    }
  }, [dispatch, match, projectId, result?.deleteResult]);

  useEffect(() => {
    setImages(project?.images);
  }, [project?.images])

  if (loading) return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>);
  if (error) console.log('Error while fetching the details', error)

  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            position: 'relative',
            color: '#fff',
            mb: 4,
            backgroundPosition: 'center',
            backgroundImage: "url('https://images.unsplash.com/photo-1631106254201-ffbee2305c5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
          }}
        >
          <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box component="form"
              sx={{
                mt: 1, display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
              }}>
              <Typography component="h1" variant="h5" color="#349beb">
                Details of
              </Typography>
              <Typography variant="h6" component='h1' gutterBottom color="black" sx={{ fontWeight: 600 }}>
                {project?.project?.name}
              </Typography>
              <Typography gutterBottom variant='h6' component='h2' color="black" sx={{ m: 3 }}>
                {project?.project?.description}
              </Typography>
              {images?.length > 0 &&
                images?.map((image, index) => (
                  <Box key={image.id} sx={{ m: 2, }}>
                    <Image
                      key={index}
                      cloudName="haharat"
                      publicId={image?.cl_image_id}
                      width="300"
                      crop="scale"
                    />
                    {userInfo?.user.id===project?.project.user_id &&
                      <IconButton name="delete" onClick={() => handleImageDelete(image?.cl_image_id)}>
                        <DeleteIcon color="warning" />
                      </IconButton>
                    }
                  </Box>
                ))}
              <Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-around"
                alignItems="center"

              >
                {userInfo?.user.id===project?.project.user_id &&
                  <Button component={Link} to={`/projects/${project?.project?.id}/update`}
                    variant="contained"
                    color="success"
                    sx={{ mb: 2, width: '20%' }}>Edit
                  </Button>
                }
                <Button component={Link} to={'/projects'}
                  variant="contained"
                  fullWidth
                  sx={{ mb: 2, width: '50%' }}>Back to list
                </Button>
                {userInfo?.user.id===project?.project.user_id &&
                  <Button
                    component={Link} to={'/projects'}
                    onClick={() => handleDelete(project?.project?.id)}
                    variant="contained"
                    color="error"
                    sx={{ mb: 2, width: '20%' }}>Delete
                  </Button >
                }
              </Box>
            </Box>
          </Container>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default ProjectDetail;
