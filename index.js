const express = require('express');
const app = express(); 
const cors = require('cors');
const pool = require('./db');
// const { append } = require('express/lib/response');


// Middleware
app.use(cors());
app.use(express.json());


// Routes
// Create an employee
app.post('/employees',async(req, res)=>{
    try {
        const {Name} = req.body;
        
        console.log(req.body);
        const newEmployee = await pool.query("INSERT INTO emp (Name) VALUES (?)",[Name]);

        res.json("Employee was created");
    } catch (err) {
        console.error(err.message);
    }
});
// Get all employee
app.get('/employees', async(req, res)=>{
    try {
        const employees = await pool.query("SELECT * FROM emp");
        res.json(employees[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// Get an employee
app.get("/employees/:Id", async(req, res)=>{
try {
    const {Id} = req.params;
    const employees = await pool.query("SELECT * FROM emp WHERE Id = ?", [Id]);

    res.json(employees[0]);
} catch (err) {
    console.error(err.message);
}
});
// Update an employee
app.put("/employees/:Id", async(req, res)=>{
    try {
        const {Id} = req.params;
        const {Name} = req.body;

        const employees = await pool.query("UPDATE emp SET Name = ? WHERE Id = ?",[Name,Id]);

        res.json("Employee was updated");
    } catch (err) {
        console.error(err.message);
    }
});
// Delete an empolyee
app.delete("/employees/:Id", async(req, res)=>{
    try {
        const {Id} = req.params;
        const delete_employees = await pool.query("DELETE FROM emp WHERE Id = ?",[Id]);
        
        res.json("Employee was deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(3000,()=>{
    console.log("Server is running in port 3000");
})