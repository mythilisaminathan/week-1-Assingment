const express = require("express");
const cors = require("cors");
const students = require("./sample.json"); 
const fs = require("fs");

const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

// GET method to fetch all students
app.get("/students", (req, res) => {
    try {
        res.json(students);
    } catch (error) {
        console.error("Error serving students data:", error); 
    }
});

// DELETE method to delete a student by ID
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const filteredStudents = students.filter((student) => student.id !== id);

    fs.writeFile('./sample.json', JSON.stringify(filteredStudents), (err) => {
        res.json(filteredStudents);
    });
});

// POST method to add a new student
app.post("/students", (req, res) => {
    const { name, age, grade, subjects } = req.body;
    if (!name || !age || !grade || !subjects) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const id = Date.now();
    students.push({ id, name, age, grade, subjects });
    fs.writeFile('./sample.json', JSON.stringify(students), (err) => {
        res.json({ message: "User Details added successfully" });
    });
});

// PATCH method to update a student by ID
app.patch("/students/:id", (req, res) => {
    const id = Number(req.params.id); 
    const { name, age, grade, subjects } = req.body;
    if (!name || !age || !grade || !subjects) {
        return res.status(400).json({ message: "All fields are required" });
    } 
    const index = students.findIndex((student) => student.id === id);
    students[index] = { id, name, age, grade, subjects };
    fs.writeFile('./sample.json', JSON.stringify(students), (err) => {
        res.json({ message: "User Details updated successfully" });
    });
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
