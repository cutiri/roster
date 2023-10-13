const express = require("express");
const Router = express.Router();
const { rosterDB } = require("../db/index");

Router.get("/api/students/id/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    res.send(rosterDB[studentId]);
});

// READ - GET
// GET /api/students?name&location
Router.get("/api/students", (req, res) => {
    const { name, location } = req.query;

    const results = rosterDB.find(name, location);

    res.send(results);
});

//POST:
Router.post(
    "/api/students/add",
    (req, res, next) => {
        const { name, location } = req.body;

        // Check if Name or Location don't exist, then we return an error and return to stop the flow
        if (!name || !location) {
            return res
                .status(418)
                .json({ error: "meh, I don't want to add that..." });
        }

        // If the function is good we pass control to the next function
        next();
    },
    (req, res) => {
        const student = rosterDB.addStudent(name, location);
        res.send(rosterDB);
    }
);

// UPDATE
// PUT /api/students/<name>
// {name?, location?}
Router.put("/api/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, location } = req.body;

    if (rosterDB[id] === undefined) {
        return res
            .status(418)
            .json({ error: "meh, I don't want to add that..." });
    }

    if (name) {
        rosterDB[id].name = name;
    }

    if (location) {
        rosterDB[id].location = location;
    }

    res.send(rosterDB);
});

// DELETE
// DELETE /api/students/<name>
Router.delete("/api/students/:id", (req, res) => {
    const id = req.params.id;

    if (rosterDB[id] === undefined) {
        return res
            .status(418)
            .json({ error: "meh, I don't want to do that..." });
    } else {
        //rosterDB.splice(id, 1);
        //rosterDB[id] = undefined;
        rosterDB.deleteStudent(id);
    }

    res.redirect(req.baseUrl);
});

module.exports = { Router };
