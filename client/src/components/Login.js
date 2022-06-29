import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions'
import { Link } from "react-router-dom";

import { Avatar, Typography, Button, Box, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login({ history }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch() 
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin
    console.log("userLogin", userLogin)
    useEffect(() => {
        console.log('Login UseEffect')
        if (userInfo) {
            history.push("/projects")
        }
    }, [history, userInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
    };

    return (
        <div className="addPage">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)} value={username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link to={'/register'} className="card-link">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
