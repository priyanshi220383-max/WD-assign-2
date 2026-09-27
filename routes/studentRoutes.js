const express = require("express");

const router = express.Router();

const students = require("../data/students");

// GET /students
// Get all students
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: students
    });
});


// GET /students/:id
// Get student by ID
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});


// POST /students
// Create a new student
router.post("/", (req, res) => {

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, age, course and email"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name,
        age,
        course,
        email
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});


// PUT /students/:id
// Update a student
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, age, course and email"
        });
    }

    student.name = name;
    student.age = age;
    student.course = course;
    student.email = email;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student
    });
});


// DELETE /students/:id
// Delete a student
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});


module.exports = router;