import React, { useState } from 'react';
import Alert from './Alert';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import { uploadImage } from "../actions/projectActions";
import { useDispatch } from "react-redux";

export default function UploadImages({ match }) {
    const dispatch = useDispatch();
    console.log("match", match)
    const projectId = match.params.id
    console.log("project id", projectId)

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        console.log("handle image file input change run")
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        console.log("handle submit image run")
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            dispatch(uploadImage(reader.result, projectId))
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        };
        reader.onerror = () => {
            console.error('uploading failed');
            setErrMsg('something went wrong with image uploading!');
        };
    };

    return (
        <div>
            <Box sx={{
                mt: 1, display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center",
                bgcolor: 'white',
            }}>
                <h1 className="title">Upload an Image</h1>
                <Alert msg={successMsg} type="success" />
                <form onSubmit={handleSubmitFile} className="form">
                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        className="form-input"
                    />
                    <button className="btn" type="submit" onClick={uploadImage}>
                        Submit
                    </button>
                </form>
                {previewSource && (
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '300px' }}
                    />
                )}
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Button
                        component={Link} to={`/projects/${projectId}/update`}
                        variant="contained"
                        color="success"
                        sx={{ m: 2, width: '30%' }}>back to Edit
                    </Button>
                    <Button component={Link} to={'/projects'}
                        variant="contained"
                        sx={{ m: 2, width: '30%' }}>Back to list
                    </Button>
                </Box>
            </Box>
        </div>
    );
}