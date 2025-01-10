const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES// RESTAPIS!!!!

//create job listing

app.post("/jobs", async(req,res) => {
    try {
        // console.log(req.body);
        const { company, job, skills, responsibilities, pay, located, deadline, link } = req.body;
        const newJob = await pool.query(
            "INSERT INTO jobs (company, job, skills, responsibilities, pay, located, deadline, link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [company, job, skills, responsibilities, pay, located, deadline, link]
        );        

        res.json(newJob.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

//get all job listings

app.get("/jobs", async(req,res) =>{
    try{
        const allJobs = await pool.query("SELECT * FROM jobs");
        res.json(allJobs.rows);
    }
    catch (err){
        console.error(err.message);
    }
});

//get a job listing

app.get("/jobs/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const job = await pool.query("SELECT * FROM jobs WHERE job_id = $1",
            [id]
        )

        res.json(job.rows[0]);
    } catch (err) {
        console.error(err.message);        
    }
});

//update a job listing
app.put("/jobs/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const {company, job, skills, responsibilities, pay, located, deadline, link} = req.body;
        const updateJob = await pool.query("UPDATE jobs SET company = $1, job = $2, skills = $3, responsibilities = $4, pay = $5, located = $6, deadline = $7, link = $8 WHERE job_id = $9",
            [company, job, skills, responsibilities, pay, located, deadline, link, id]
        );  

        res.json("job was updated");
    } catch (err) {
        console.error(err.message);            
    }
})

//delete a job listing
app.delete("/jobs/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteJob = await pool.query("DELETE FROM jobs WHERE job_id = $1",
            [id]
        );

        res.json("job was deleted!");
    } catch (err) {
        console.error(err.message);   
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});

process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await pool.end();
    process.exit();
  });