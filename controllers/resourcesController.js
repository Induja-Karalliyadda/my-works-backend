import db from "../db/dbConfig.js";

// Get all resources
export const getAllResources = async (req, res) => {
    try {
        const sql = "SELECT * FROM resources";
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a resource by ID
export const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM resources WHERE resourceId = ?";
        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) return res.status(404).json({ message: "Resource not found" });
            res.json(result[0]);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Create a new resource
export const createResource = async (req, res) => {
    try {
        const { course_id, resourceName, resourceURL } = req.body;  // resourceURL from file upload

        const sql = "INSERT INTO resources (course_id, resourceName, resourceURL) VALUES (?, ?, ?)";
        db.query(sql, [course_id, resourceName, resourceURL], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Resource created", resourceId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update an existing resource
export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_id, resourceName, resourceURL } = req.body;
        const sql = "UPDATE resources SET course_id = ?, resourceName = ?, resourceURL = ? WHERE resourceId = ?";
        db.query(sql, [course_id, resourceName, resourceURL, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Resource not found" });
            res.json({ message: "Resource updated" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a resource
export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM resources WHERE resourceId = ?";
        db.query(sql, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Resource not found" });
            res.json({ message: "Resource deleted" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
