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
    useMediaQuery,
    InputAdornment
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

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

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const isDesktop = useMediaQuery('(min-width:769px)');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let tempErrors = { ...errors };
        if (name === 'email') {
            tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? '' : 'Email is not valid.';
        }
        if (name === 'password') {
            tempErrors.password = value.length >= 8 ? '' : 'Password must be at least 8 characters.';
        }
        if (name === 'confirmPassword') {
            tempErrors.confirmPassword = value === formData.password ? '' : 'Passwords do not match.';
        }
        setErrors({ ...tempErrors });
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
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>User information:</Typography>
                        <TextField
                            label="Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last name"
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
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.email && !errors.email && (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.password && !errors.password ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : null}
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            label="Confirm password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.confirmPassword && !errors.confirmPassword ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                        ) : null}
                                    </InputAdornment>
                                ),
                            }}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Project information:</Typography>
                        <TextField
                            label="Project name"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Company name"
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
                            label="Observations (0-300)"
                            name="observations"
                            multiline
                            rows={4}
                            value={formData.observations}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Typography variant="h5" sx={{ marginTop: '25px' }}>Subscription plan information:</Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Select a plan</InputLabel>
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
                                Submit
                            </Button>
                        </Box>
                        {submitted && (
                            <Typography variant="body1" color="primary">
                                Your form has been successfully submitted!
                            </Typography>
                        )}
                    </>
                ) : (
                    // Carrusel con formulario para móviles
                    <Swiper
                        noSwipingClass="swiper-no-swiping"
                        navigation
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="swiper-container"

                    >
                        <SwiperSlide >
                            <Typography variant="h5" sx={{ marginTop: '25px' }}>User information:</Typography>
                            <TextField
                                label="First name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Last name"
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
                                error={!!errors.email}
                                helperText={errors.email}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {formData.email && !errors.email && (
                                                <CheckCircleIcon style={{ color: 'green' }} />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {formData.password && !errors.password ? (
                                                <CheckCircleIcon style={{ color: 'green' }} />
                                            ) : null}
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <TextField
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                                style={{ marginBottom: '30px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {formData.confirmPassword && !errors.confirmPassword ? (
                                                <CheckCircleIcon style={{ color: 'green' }} />
                                            ) : null}
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </SwiperSlide>
                        <SwiperSlide>

                            <Typography variant="h5" sx={{ marginTop: '25px' }}>Project information:</Typography>
                            <TextField
                                label="Project name"
                                name="project_name"
                                value={formData.project_name}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Company name"
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
                                label="Observations (0-300)"
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
                            <Typography variant="h5" sx={{ marginTop: '25px' }}>Subscription plan information:</Typography>
                            <FormControl fullWidth margin="normal" className="swiper-no-swiping">
                                <InputLabel>Select a plan</InputLabel>
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
                        <Box mt={2} >
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </div>
                )}
                {submitted && (
                    <Typography variant="body1" color="primary">
                        Your form has been successfully submitted!
                    </Typography>
                )}
            </form>
        </Container >
    );
}

export default SignupComponent;
