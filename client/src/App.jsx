import React, {useState, useEffect} from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import './App.css';
import MUIDataTable from "mui-datatables";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [showForm, setShowForm] = useState(false);
      const [formData, setFormData] = useState({
          company: "",
          job: "",
          skills: "",
          responsibilities: "",
          pay: "",
          located: "",
          deadline: "",
          link: "",
      });
  
      const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
      };
  
      const onSubmitForm = async (e) => {
          e.preventDefault();
          try{
              const body = formData;
              // console.log("before POST");
              const response = await fetch("http://localhost:5000/jobs", {
                  method: "POST",
                  headers: { "Content-Type": "application/json"},
                  body: JSON.stringify(body),
              });
              
              // reset the form and hide it
              setFormData({
                  company: "",
                  job: "",
                  skills: "",
                  responsibilities: "",
                  pay: "",
                  located: "",
                  deadline: "",
                  link: "",
              });
              setShowForm(false);
          } catch (err) {
              console.error("Error adding job listing:", err.message);
          }

          getJobs();
      };

      //data table starts now
      const getMuiTheme = () => createTheme({
        typography: {
            fontFamily: "Poppins",
        },
        palette: {
            background: {
                paper: "#2c3e5c",
                default: "#2c3f5c",
            },
            mode: "dark",
        },
      });
      //state to store the jobs fetched from database
      const [jobs, setJobs] = useState([]);
      //function to fetch data from PostgreSQL api endpoint
      const getJobs = async () => {
          try{
              const response = await fetch("http://localhost:5000/jobs");
              const jsonData = await response.json(); //parse response into JSON format

              setJobs(jsonData);
          }catch (err){
              console.error("error fetching job data:", err.message);
          }
      };

      useEffect(() => {
          getJobs();
      }, []); 


      const handleDelete = async(id) =>{
        try {
          const response = await fetch(`http://localhost:5000/jobs/${id}`,{
            method: "DELETE"
          });
        } catch (error) {
          console.log("error delete job: ",error);
        }
        getJobs();
      }
      
      const columns = [
        {
          name: "Company",
        },
        {
          name: "Job",
        },
        {
          name: "Skills",
        },
        {
          name: "Responsibilities",
        },
        {
          name: "Pay",
        },
        {
          name: "Located",
        },
        {
          name: "Deadline",
        },
        {
          name: "Link",
        },
        {
          name: "Edit",
          options: {
            customBodyRender: (value, tableMeta) => {
              const jobId = jobs[tableMeta.rowIndex].job_id; 
              return (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  // onClick={() => handleEdit(jobId)}
                >
                  Edit
                </Button>
              );
            },
          },
        },
        {
          name: "Delete",
          options: {
            customBodyRender: (value, tableMeta) => {
              const jobId = jobs[tableMeta.rowIndex].job_id; 
              return (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(jobId)}
                >
                  Delete
                </Button>
              );
            },
          },
        },
      ];

      // transform data from database to match table format
      const formatedData = jobs.map((eachJob) => [
        eachJob.company,
        eachJob.job,
        eachJob.skills,
        eachJob.responsibilities,
        eachJob.pay,
        eachJob.located,
        eachJob.deadline,
        eachJob.link,
        null,
        null,
      ]);
  
      return (
          <div className= "py-10 min-h-screen grid place-items-center">
              <div className="w-10/12 max-w-4xl">
                  <Button 
                    variant="contained" 
                    onClick={() => setShowForm(!showForm)}
                    style={{
                      backgroundColor: '#3e5375',  
                      color: 'white',              
                    }}>
                      {showForm ? "Cancel" : "Add Job Listing"}
                  </Button>
  
                  {showForm && (
                    <Box
                        mt={2}
                        p={3}
                        bgcolor="#1e293b"
                        borderRadius={2}
                        boxShadow={2}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                    >
                        <Grid container spacing={2}>
                            {[
                                "Company",
                                "Job",
                                "Skills",
                                "Responsibilities",
                                "Pay",
                                "Located",
                                "Deadline",
                                "Link",
                            ].map((placeholder, index) => {
                                const name = placeholder.toLowerCase().replace(/ /g, "");
                                return (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label={placeholder}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleInputChange}
                                            InputLabelProps={{
                                                sx: { color: "white" },
                                            }}
                                            sx={{
                                                backgroundColor: "#3d5478",
                                            }}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button
                            variant="contained"
                            onClick={onSubmitForm}
                            style={{
                                backgroundColor: "#3e5375",
                                color: "white",
                            }}>
                            Add Job Listing
                        </Button>
                    </Box>
                  )}
                  <Box mt={4}>
                    <ThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"All Job Listings"}
                            data={formatedData}
                            columns={columns} 
                            options={{
                                selectableRows: false,
                                elevation: 22,
                                rowsPerPage: 5,
                                rowsPerPageOptions: [5, 10, 20, 30],
                            }}
                        />
                    </ThemeProvider>
                  </Box>
              </div>
          </div>
      );
}

export default App;
