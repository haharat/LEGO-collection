const express = require("express");
const {
    getProjects, getProject, createProject, updateProject, deleteProject, uploadImage, deleteImage
} = require("../controllers/project");
const protect = require("../middlewares/auth");
const router = express.Router();

// http://localhost:5000/api/v1/projects
router.get("/", getProjects);
// http://localhost:5000/api/records/
//router.get("/api/v1/projects", protect, getMyProjects);
// http://localhost:5000/api/v1/projects/:id
router.get("/:id", getProject);
// http://localhost:5000/api/v1/projects
router.post("/", protect, createProject);
// http://localhost:5000/api/v1/projects/:id
router.put("/:id", protect, updateProject);
// http://localhost:5000/api/v1/projects/:id
router.delete("/:id", protect, deleteProject);
// http://localhost:5000/api/v1/projects/imageUpload/:id
router.post("/imageUpload/:id", protect, uploadImage);
// http://localhost:5000/api/v1/projects/images/:cloudinary_id
router.delete("/images/:cloudinary_id", protect, deleteImage);

module.exports = router;