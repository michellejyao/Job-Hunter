import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";

function InputJob() {

    // const [showForm, setShowForm] = useState(false);
    // const [formData, setFormData] = useState({
    //     company: "",
    //     job: "",
    //     skills: "",
    //     description: "",
    //     pay: "",
    //     location: "",
    //     deadline: "",
    //     link: "",
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const onSubmitForm = async (e) => {
    //     e.preventDefault();
    //     try{
    //         const body = {formData};
    //         const response = await fetch("http://localhost:5000/jobs", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json"},
    //             body: JSON.stringify(body),
    //         });

    //         console.log(response);
            
    //         // Reset the form and hide it
    //         setFormData({
    //             company: "",
    //             job: "",
    //             skills: "",
    //             description: "",
    //             pay: "",
    //             location: "",
    //             deadline: "",
    //             link: "",
    //         });
    //         setShowForm(false);
    //     } catch (err) {
    //         console.error("Error adding job listing:", err.message);
    //     }
    // };

    return (
        <div className="bg-slate-700 py-10 min-h-screen grid place-items-center">
            <div className="w-10/12 max-w-4xl">
                <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
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
                                "Job Title",
                                "Skills",
                                "Description",
                                "Pay",
                                "Location",
                                "Deadline",
                                "Link",
                            ].map((placeholder, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label={placeholder}
                                        name={placeholder.toLowerCase().replace(/ /g, "")}
                                        value={formData[placeholder.toLowerCase().replace(/ /g, "")]}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            sx: { color: "white" },// sx is an alternative to style because we using Material-UI styling
                                        }}
                                        sx={{
                                            backgroundColor: "#779eb2", // Background color
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button variant="contained" onClick={handleAddJob}
                            style={{
                                backgroundColor: '#2b434f',  // Custom red background
                                color: 'white',              // Custom white text
                            }}>
                            Add Job Listing
                        </Button>
                    </Box>
                )};
            </div>
        </div>
    );
}

export default InputJob;
