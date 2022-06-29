import axios from "axios";
import {
  PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAIL,
  PROJECT_CREATE_REQUEST, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAIL, PROJECT_CREATE_RESET,
  PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS, PROJECT_DETAILS_FAIL,
  PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAIL, PROJECT_UPDATE_RESET,
  PROJECT_DELETE_REQUEST, PROJECT_DELETE_SUCCESS, PROJECT_DELETE_FAIL,
  IMAGE_DELETE_REQUEST, IMAGE_DELETE_SUCCESS, IMAGE_DELETE_FAIL,
  IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAIL, IMAGE_UPLOAD_RESET
} from '../constants/projectConstants'

//list all projects
export const listProjects = () => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST }) 

    const response = await axios.get('/api/v1/projects')
    console.log("list project response", response)
    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: response.data.data.projects
    })
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAIL,
      payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
    })
  }
}

// create project
export const createProject = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_CREATE_REQUEST })

    const {userLogin: {userInfo}} = getState()
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.post('/api/v1/projects', data, config)

    dispatch({ type: PROJECT_CREATE_SUCCESS, payload: response.data.data })

  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
    })
  }
}

export const getProjectDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST, payload: id })

    const response = await axios.get(`/api/v1/projects/${id}`)
    console.log("get project detail response",response)
    let filteredProject = {};
    if (response.data.data.length > 0) {
      filteredProject = response.data.data.filter((project) => project.id === id);
    }
    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: response.data.data })
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
    })
  }
}

export const updateProject = (id, projectUpdate) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST })
    const {userLogin: {userInfo}, projectDetails:{project}} = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    
    if(userInfo.user.id===project.project.user_id){
    const response = await axios.put(`/api/v1/projects/${id}`, projectUpdate, config)

    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: response.data.data })
    } else{
      console.log("not the same user, cannot update project")
    }
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
    })
  }
}

export const deleteProject = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_DELETE_REQUEST })
    const {userLogin: {userInfo}, projectDetails:{project}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    if(userInfo.user.id===project.project.user_id){
    const response = await axios.delete(`/api/v1/projects/${id}`, config)

    dispatch({ type: PROJECT_DELETE_SUCCESS, payload: response.data.data })
    } else{
      console.log("not the same user, cannot delete project")
    }
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
    })
  }
}

export const uploadImage = (base64EncodedImage, projectId) => async (dispatch, getState ) => {

  try {
    dispatch({ type: IMAGE_UPLOAD_REQUEST })
    const {userLogin: {userInfo}, projectDetails:{project}} = getState()

    const config = {
      method: 'POST',
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      }
    }
    if(userInfo.user.id===project.project.user_id){
    const response = await fetch(`/api/v1/projects/imageUpload/${projectId}`, config);

      dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: response.data.data })
    } else{
      console.log("not the same user, cannot upload image under this project")
    }
  } catch (error) {
      dispatch({
        type: IMAGE_UPLOAD_FAIL,
        payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
      })
  }
};

export const deleteImage = (cloudinaryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: IMAGE_DELETE_REQUEST })
    const {userLogin: {userInfo}, projectDetails: {project}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    if(userInfo.user.id===project.project.user_id){
    const response = await axios.delete(`/api/v1/projects/images/${cloudinaryId}`, config)

    dispatch({ type: IMAGE_DELETE_SUCCESS, payload: response.data.data })
    } else{
      console.log("not the same user, cannot delete project image")
    }
  } catch (error) {
    dispatch({
      type: IMAGE_DELETE_FAIL,
      payload: error.response && error.response.data.data.message ? error.response.data.data.message : error.message
    })
  }

}
