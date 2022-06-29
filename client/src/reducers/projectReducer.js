import { PROJECT_LIST_REQUEST, PROJECT_LIST_FAIL, PROJECT_LIST_SUCCESS, 
  PROJECT_CREATE_REQUEST, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAIL, PROJECT_CREATE_RESET,
  PROJECT_DETAILS_REQUEST, PROJECT_DETAILS_SUCCESS, PROJECT_DETAILS_FAIL,
  PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAIL, PROJECT_UPDATE_RESET,
  PROJECT_DELETE_REQUEST, PROJECT_DELETE_SUCCESS, PROJECT_DELETE_FAIL,
  IMAGE_DELETE_REQUEST, IMAGE_DELETE_SUCCESS, IMAGE_DELETE_FAIL,
  IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAIL, IMAGE_UPLOAD_RESET} from '../constants/projectConstants'

export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] }
    case PROJECT_LIST_SUCCESS:
      return {
        loading: false,
        projects: action.payload
      }
    case PROJECT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return { loading: true }
    case PROJECT_CREATE_SUCCESS:
      return { loading: false, success: true, project: action.payload }
    case PROJECT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PROJECT_CREATE_RESET:
      return { loading: false, success: false, project: {} }
    default: return state;
  }
}

export const imageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { loading: true }
    case IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, image: action.payload }
    case IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload }
    case IMAGE_UPLOAD_RESET:
      return { loading: false, success: false, image: {} }
    default: return state;
  }
}

export const projectUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true }
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, success: true, project: action.payload }
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PROJECT_UPDATE_RESET:
      return {loading: false, success: false, project: {}
      }  
    default: return state;
  }
}

export const projectDetailsReducer = (state = {}, action) => {
  switch(action.type) {
    case PROJECT_DETAILS_REQUEST:
      return {loading: true, ...state}
    case PROJECT_DETAILS_SUCCESS:
      return {loading: false, project: action.payload}
    case PROJECT_DETAILS_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loading: true }
    case PROJECT_DELETE_SUCCESS:
      return { loading: false, success: true}
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false}
    default: return state;
  }
}

export const imageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_DELETE_REQUEST:
      return { loading: true }
    case IMAGE_DELETE_SUCCESS:
      return { loading: false, result:action.payload}
    case IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false}
    default: return state;
  }
}

