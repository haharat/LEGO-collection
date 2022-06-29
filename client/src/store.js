import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {projectListReducer, projectCreateReducer, projectUpdateReducer, projectDeleteReducer, imageDeleteReducer, projectDetailsReducer} from './reducers/projectReducer'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducer'

const reducer = combineReducers({
    projectList: projectListReducer,
    projectCreate: projectCreateReducer,
    projectUpdate: projectUpdateReducer,
    projectDelete: projectDeleteReducer,
    imageDelete: imageDeleteReducer,
    projectDetails: projectDetailsReducer,
    userLogin: userLoginReducer,     
    userRegister: userRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;