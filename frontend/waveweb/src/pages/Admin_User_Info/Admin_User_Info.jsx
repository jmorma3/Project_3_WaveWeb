import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";

import NavBarMyProjects from "../../components/NavBarMyProjects/NavBarMyProjects";
import { getOneUser, updateOneUser, deleteOneUser } from "../../services/userService";

const Admin_User_Info = () => {
    const { userId } = useParams();

    const [user, setUser] = useState({});
    const [editUser, setEditUser] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOneUser(userId);
            setUser(result);
            setEditUser({});
        };
        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos modificados:", editUser);
        await updateOneUser(userId, editUser);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            await deleteOneUser(userId);
            navigate('/admin'); // Redirige al ADMIN a la página principal después de eliminar al usuario
        }
    };

    return (
        <>
            <div className="water-background" >
                <NavBarMyProjects />
                <Container component="main" maxWidth="sm">
                    <Paper style={{ padding: 20, marginTop: 20 }}>
                        <Typography variant="h6">Edit User Information</Typography>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <Typography variant="subtitle1">User ID: {user.id}</Typography>

                            <Typography variant="subtitle1">Current First Name: {user.first_name}</Typography>
                            <TextField
                                label="New First Name"
                                variant="outlined"
                                name="first_name"
                                placeholder="Enter new first name"
                                value={editUser.first_name || ''}
                                onChange={handleChange}
                            />

                            <Typography variant="subtitle1">Current Last Name: {user.last_name}</Typography>
                            <TextField
                                label="New Last Name"
                                variant="outlined"
                                name="last_name"
                                placeholder="Enter new last name"
                                value={editUser.last_name || ''}
                                onChange={handleChange}
                            />

                            <Typography variant="subtitle1">Current Email: {user.email}</Typography>
                            <TextField
                                label="New Email"
                                variant="outlined"
                                name="email"
                                placeholder="Enter new email"
                                value={editUser.email || ''}
                                onChange={handleChange}
                            />

                            <Typography variant="subtitle1">Current Role: {user.role}</Typography>
                            <TextField
                                label="New Role"
                                variant="outlined"
                                name="role"
                                placeholder="Enter new role"
                                value={editUser.role || ''}
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
                                Delete User
                            </Button>
                            </div>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    );
};

export default Admin_User_Info;
