import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects";
import { getOneProject, updateOneProject, deleteOneProject } from "../../services/projectService";

const Admin_Project_Info = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState({});
    const [editProject, setEditProject] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOneProject(projectId);
            setProject(result);
            setEditProject({}); // Se inicializa editProject vacío
        };
        fetchData();
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProject({ ...editProject, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateOneProject(projectId, editProject);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (confirmDelete) {
            await deleteOneProject(projectId);
            navigate('/admin');
        }
    };

    return (
        <>
           <div className="water-background" >
            <NavBarMyProjects />
            <Container component="main" maxWidth="sm">
                <Paper style={{ padding: 20, marginTop: 20 }}>
                    <Typography variant="h6">Edit Project Information</Typography>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <Typography variant="subtitle1">Project ID: {project.id}</Typography>

                        <Typography variant="subtitle1">Current Project Name: {project.project_name}</Typography>
                        <TextField
                            label="New Project Name"
                            variant="outlined"
                            name="project_name"
                            placeholder="Enter new project name"
                            value={editProject.project_name || ''}
                            onChange={handleChange}
                        />

                        <Typography variant="subtitle1">Current Project Type: {project.project_type}</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Project Type</InputLabel>
                            <Select
                                name="project_type"
                                value={editProject.project_type || ''}
                                label="Project Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="Basic Web">Basic Web</MenuItem>
                                <MenuItem value="Dynamic Web">Dynamic Web</MenuItem>
                                <MenuItem value="E-Commerce Web">E-Commerce Web</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant="subtitle1">Current Price: ${project.price}</Typography>
                        <TextField
                            label="New Price"
                            variant="outlined"
                            name="price"
                            type="number"
                            placeholder="Enter new price"
                            value={editProject.price || ''}
                            onChange={handleChange}
                        />

                        <Typography variant="subtitle1">Current Progress Status: {project.progress_status}</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Progress Status</InputLabel>
                            <Select
                                name="progress_status"
                                value={editProject.progress_status || ''}
                                label="Progress Status"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Not Started</MenuItem>
                                <MenuItem value={1}>In Progress Step 1</MenuItem>
                                <MenuItem value={2}>In Progress Step 2</MenuItem>
                                <MenuItem value={3}>Completed</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant="subtitle1">Current Developer ID: {project.devId}</Typography>
                        <TextField
                            label="New Developer ID"
                            variant="outlined"
                            name="devId"
                            placeholder="Enter new developer ID"
                            value={editProject.devId || ''}
                            onChange={handleChange}
                        />

                        <Typography variant="subtitle1">Current Client ID: {project.clientId}</Typography>
                        <TextField
                            label="New Client ID"
                            variant="outlined"
                            name="clientId"
                            placeholder="Enter new client ID"
                            value={editProject.clientId || ''}
                            onChange={handleChange}
                        />

<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: '25px',
                                    padding: '1px 20px',
                                    width: '300px',
                                    marginBottom: '10px'
                                    

                                }}>
                                Save Changes
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDelete}
                                sx={{
                                    borderRadius: '25px',
                                    padding: '1px 20px',
                                    width: '300px'
                                }}>
                                Delete Project
                            </Button>
                            </div>
                    </form>
                </Paper>
            </Container>
            </div>
        </>
    );
};

export default Admin_Project_Info;
