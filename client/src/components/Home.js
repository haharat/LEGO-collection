import React from "react"
import { Link } from "react-router-dom";
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

function Home() {
    return (
        <div className="main">
            <Header title="Blog" />
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2017/06/28/00/22/lego-2449336_1280.jpg')",
                }}
            >
                <Box pt={20}
                    sx={{
                        p: { xs: 15, md: 20 },
                        pr: { md: 0 },
                    }}
                >
                </Box>
            </Paper>
            <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Button component={Link} to="/projects" variant="contained" color="primary">
                    Explore All Projects
                </Button>
            </Box>
            <Box m={2} pt={3}>
                <Typography variant="h4" gutterBottom >
                    About
                </Typography>
                <Typography variant="h6" >
                    Love building with Legos? Proud of your LEGO projects? Don't know where to store your projects?
                    This is where you can show off your LEGO projects and share your great LEGO ideas!
                </Typography>
            </Box>
            <Divider />
            <Footer
                title="Footer"
            />
        </div>
    )
}

export default Home;