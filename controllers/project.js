const { cloudinary } = require('../utils/cloudinary');
const db = require("../db")

// Get all projects
const getProjects = async (req, res) => {
    try {
        const projectsData = await db.query(
            "select * from projects;"
        );
        const imagesData = await db.query(
            "SELECT * FROM project_images"
        );
        res.status(200).json({
            status: "success",
            results: projectsData.rows.length,
            data: {
                projects: projectsData.rows,
                images: imagesData.rows
            }
        })

    } catch (err) {
        console.log(err)
    }
}

//Get a project
const getProject=async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM projects WHERE id = $1",
            [req.params.id]
        );
        const images = await db.query(
            "SELECT * FROM project_images WHERE project_id = $1", [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                project: result.rows[0],
                images: images.rows,
            },
        });

    } catch (err) {
        console.log(err);
    }
}

// Create a project
const createProject=async (req, res) => {
    try {
        const result = await db.query(
            "INSERT INTO projects (name, description, category, user_id) values ($1, $2, $3, $4) returning *",
            [req.body.projectName, req.body.projectDescription, req.body.projectCategory, req.body.projectUserId ]
        ); 
        res.status(201).json({
            status: "success",
            data: { 
                project: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
}

// Upload images to selected project
const uploadImage=async (req, res) => {
    
    try {
        const fileStr = req.body.data
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {});

        const result = await db.query(
            "INSERT INTO project_images(project_id, image_url, cl_image_id) VALUES ($1, $2, $3) returning *",
            [req.params.id, uploadResponse.secure_url, uploadResponse.public_id] 
        );

        await db.query(           
            "UPDATE projects SET cloudinary_url = $1 WHERE id = $2 returning *",
            [uploadResponse.secure_url, req.params.id] 
        );

        console.log("uploadResponse", uploadResponse);
        res.status(201).json({
            status: "success",
            data: { 
                msg: 'image uploaded successfully',
                image: result.rows[0],
                publicIds: result.rows[0].public_id,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong with image uploading' });
    }
}

// Update project
const updateProject=async (req, res) => {
    
    try {
        const results = await db.query(
            "UPDATE projects SET name = $1, description = $2, category = $3 where id = $4 returning *",
            [req.body.projectName, req.body.projectDescription, req.body.projectCategory, req.params.id]
        );

        res.status(200).json({
            status: "success",
            data: {
                project: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete project
const deleteProject=async (req, res) => {
    try {
        const results = db.query("DELETE FROM projects where id = $1", [req.params.id,]);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
}

// delete images 
const deleteImage=async (req, res) => {
    const { cloudinary_id } = req.params;
    try {
        cloudinary.uploader
            .destroy(cloudinary_id)
            .then((result) => {
                res.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Delete failed",
                    error,
                });
            });
        const result = await db.query(
            "DELETE FROM project_images WHERE cl_image_id = $1",
            [cloudinary_id]
        );
        res.status(201).json({
            status: "success",
            data: { 
                msg: 'image deleted successfully',
                deleteResult: result,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong with image deleting' });
    }
}

module.exports = { createProject, getProjects, updateProject, getProject, deleteProject, deleteImage, uploadImage}
