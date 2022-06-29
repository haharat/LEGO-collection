require("dotenv").config();
const { cloudinary } = require('./utils/cloudinary');
const express = require("express")
const cors = require("cors")
const path = require('path')
const projectRouter = require('./routes/project')
const userRouter = require('./routes/user')
const app = express()

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/users", userRouter) 

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "client/build")))
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
