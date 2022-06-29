import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ProjectList from "./components/ProjectList";
import AddProject from "./components/AddProject";
import UpdateProject from "./components/UpdateProject";
import ProjectDetail from "./components/ProjectDetail";
import UploadImages from "./components/UploadImages";
import FilteredProjectList from "./components/FilteredProjectList";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  return (

      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register}  />
            <Route exact path="/login" component={Login}  />  
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/projects/:id/update" component={UpdateProject} />
            <Route exact path="/projects/:id" component={ProjectDetail} />
            <Route exact path="/projects" component={ProjectList} />  
            <Route exact path="/projects/:id/uploadImages" component={UploadImages} />
            <Route exact path="/projects/:category/categories" component={FilteredProjectList} />            
          </Switch>
        </Router>
      </div>
  );
};

export default App;
