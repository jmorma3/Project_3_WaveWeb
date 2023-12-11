import "./SignupForm.css"

import React, { useState } from 'react';

import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Container,
    Typography,
    Box,
    useMediaQuery
} from '@mui/material';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper/core";
import { Pagination } from "swiper/modules";

function SignupComponent() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client', //Por defecto, siempre es 'client'
        project_name: '',
        company_name: '',
        sector: '',
        observations: '',
        selectedPlan: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const isDesktop = useMediaQuery('(min-width:769px)');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePlanSelect = (e) => {
        setFormData({ ...formData, selectedPlan: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos al servidor (backend) y mostrar el mensaje de éxito después de la respuesta del servidor.
        // Puedes usar fetch o axios para hacer la solicitud al backend.
        // Después de recibir una respuesta exitosa, puedes establecer setSubmitted(true) para mostrar el mensaje de éxito.
        setSubmitted(true);
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                {isDesktop ? (
                    // Formulario sin carrusel para escritorio
                    <>
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Datos del usuario</Typography>
                        <TextField
                            label="Nombre"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Apellido"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Confirmar Contraseña"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Datos del Proyecto</Typography>
                        <TextField
                            label="Nombre del Proyecto"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Nombre de la Empresa"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Observaciones"
                            name="observations"
                            multiline
                            rows={4}
                            value={formData.observations}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Datos del suscripción</Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Selecciona un plan</InputLabel>
                            <Select
                                name="selectedPlan"
                                value={formData.selectedPlan}
                                onChange={handlePlanSelect}
                            >
                                <MenuItem value="Basic web">Basic web</MenuItem>
                                <MenuItem value="Dynamic web">Dynamic web</MenuItem>
                                <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                            </Select>
                        </FormControl>
                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Registrarse
                            </Button>
                        </Box>
                        {submitted && (
                            <Typography variant="body1" color="primary">
                                Tu formulario ha sido enviado correctamente
                            </Typography>
                        )}
                    </>
                ) : (
                    // Carrusel con formulario para móviles
                    <Swiper
                        navigation
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="swiper-container"
                    >
                        <SwiperSlide>
                            <Typography variant="h5" sx={{ marginTop: '25px' }}>Datos del usuario</Typography>
                            <TextField
                                label="Nombre"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Apellido"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Confirmar Contraseña"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </SwiperSlide>
                        <SwiperSlide>

                            <Typography variant="h5" sx={{ marginTop: '25px' }}>Datos del Proyecto</Typography>
                            <TextField
                                label="Nombre del Proyecto"
                                name="project_name"
                                value={formData.project_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Nombre de la Empresa"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Sector"
                                name="sector"
                                value={formData.sector}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Observaciones"
                                name="observations"
                                multiline
                                rows={4}
                                value={formData.observations}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Typography variant="h5" sx={{ marginTop: '25px' }}>Datos del suscripción</Typography>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Selecciona un plan</InputLabel>
                                <Select
                                    name="selectedPlan"
                                    value={formData.selectedPlan}
                                    onChange={handlePlanSelect}
                                >
                                    <MenuItem value="Basic web">Basic web</MenuItem>
                                    <MenuItem value="Dynamic web">Dynamic web</MenuItem>
                                    <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                                </Select>
                            </FormControl>

                        </SwiperSlide>
                    </Swiper>
                )}
                {!isDesktop && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',

                        }}
                    >
                        <Box mt={10}>
                            <Button  type="submit" variant="contained" color="primary">
                                Registrarse
                            </Button>
                        </Box>
                    </div>
                )}
                {submitted && (
                    <Typography variant="body1" color="primary">
                        Tu formulario ha sido enviado correctamente
                    </Typography>
                )}
            </form>
        </Container >
    );
}

export default SignupComponent;
