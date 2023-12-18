//Importaciones de librerías externas
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Stepper,
    Step,
    StepLabel,
    InputAdornment,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//Importamos componentes y estilos
import "./SignupForm.css"
import PlanCard from "../PlanCard/PlanCard";

//Importamos los servicios
import { signup } from "../../services/authService";
import { createProject } from "../../services/projectService";


function SignupComponent() {
    const [activeStep, setActiveStep] = useState(0);

    // Estados para controlar la visibilidad de las contraseñas
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const steps = ['User information', 'Project information', 'Subscription plan information'];

    const plans = [
        {
            title: 'Basic Web',
            subtitle: 'A static site ideal for simple online presence.',
            features: [
                'Info Display',
                'Contact Page',
                'Image Gallery'
            ],
            price: '2.000 EUR'
        },
        {
            title: 'Dynamic Web',
            subtitle: 'Interactive site with CMS for dynamic content.',
            features: [
                'User Forms',
                'Blog Section',
                'Custom CMS'
            ],
            price: '4.000 EUR'
        },
        {
            title: 'E-Commerce Web',
            subtitle: 'Complete solution for online stores with cart.',
            features: [
                'Shopping Cart',
                'Product Lists',
                'Payment Gateway'
            ],
            price: '6.000 EUR'
        }
    ];


    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client', //Por defecto, siempre es 'client'
        project_name: '',
        project_type: '',
        company_name: '',
        sector: '',
        observations: '',
        price: 0
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name: input, value } = e.target;
        setFormData({ ...formData, [input]: value });
        validateField(input, value);
    };

    const validateField = (input, value) => {
        let tempErrors = { ...errors };
        if (input === 'email') {
            tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) ? '' : 'Email is not valid.';
        }
        if (input === 'password') {
            tempErrors.password = value.length >= 8 ? '' : 'Password must be at least 8 characters.';
        }
        if (input === 'confirmPassword') {
            tempErrors.confirmPassword = value === formData.password ? '' : 'Passwords do not match.';
        }
        setErrors({ ...tempErrors });
    };

    const handlePlanSelect = (input) => {
        const plan = typeof input === 'string' ? input : input.target.value;
        let projectType, planPrice;

        switch (plan) {
            case "Basic Web":
                projectType = "Basic Web";
                planPrice = 2000.00;
                break;
            case "Dynamic Web":
                projectType = "Dynamic Web";
                planPrice = 4000.00;

                break;
            case "E-Commerce Web":
                projectType = "E-Commerce Web";
                planPrice = 6000.00;
                break;
            default:
                projectType = "Basic Web";
                planPrice = 2000.00;
        }

        setFormData({ ...formData, project_type: projectType, price: planPrice });
    };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };


    const navigate = useNavigate()

    const handleCloseDialog = () => {
        setOpenDialog(false);
        //Una vez se cree el proyecto y cliquemos en "OK", navegamos directamente al Dashboard del cliente para ver su proyecto. 
        navigate(`/myProjects/5`)
    };

    const handleSubmitUser = async () => {
        try {
            const { first_name, last_name, email, password, role } = formData;
            const userData = { first_name, last_name, email, password, role };

            await signup(userData);

            handleNext();
        } catch (error) {
            setSnackbarMessage('Error creating user. Please try again.');
            setOpenSnackbar(true);

        }
    };

    const handleSubmitProject = () => {
        handleNext();

    };


    const handleFinish = async () => {

        //Creación del proyecto:
        try {
            const { project_name, company_name, sector, observations, project_type, price } = formData;
            const projectData = {
                project_name,
                company_name,
                sector,
                observations,
                project_type,
                price,
                progress_status: 0,
                plus_prototype: false,
                devId: 2,
                clientId: parseInt(localStorage.getItem('userId')),
            };

            await createProject(projectData);


        } catch (error) {
            setSnackbarMessage('Error creating project. Please try again.');
            setOpenSnackbar(true);

        }

        setOpenDialog(true);

        // Opciones y pasarela de pago
        ////////////////////////STRIPE/////////////////////
        switch (formData.project_type) {
            case "Basic Web":
                window.open("https://buy.stripe.com/test_6oE7vc2lX2dg80MeV0");
                break;
            case "Dynamic Web":
                window.open("https://buy.stripe.com/test_14keXE5y9f0280M8wD");
                break;
            case "E-Commerce Web":
                window.open("https://buy.stripe.com/test_6oEbLs9Op2dggxiaEM");
                break;
        }
        ////////////////////////STRIPE/////////////////////

    };

    // Funciones para cambiar la visibilidad de las contraseñas
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    return (
        <div className="signForm-container">
            <Container
                className="form-container"
                maxWidth="sm"
                style={({
                    backgroundColor: "white",
                    marginTop: '-25px'
                })} >
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ marginTop: '10px' }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form>
                    {activeStep === 0 && (
                        <>
                            <Typography
                                variant="h5"
                                sx={{ marginTop: '10px' }}
                            >
                                User information:
                            </Typography>

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
                                type={showPassword ? 'text' : 'password'}
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
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <TextField
                                label="Confirm password"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
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
                                            <IconButton onClick={toggleConfirmPasswordVisibility}>
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <Typography
                                variant="h5"
                                sx={{ marginTop: '10px' }}
                            >
                                Project information:
                            </Typography>

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
                                rows={2}
                                value={formData.observations}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            <div>
                                <Typography
                                    variant="h5"
                                    sx={{ marginTop: '10px' }}
                                >
                                    Subscription plan information:
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    mx: 'auto',
                                    maxWidth: 'lg',
                                }}>
                                    {plans.map((plan) => (
                                        <PlanCard
                                            key={plan.title}
                                            plan={plan}
                                            selected={formData.project_type === plan.title}
                                            onSelect={handlePlanSelect}
                                        />
                                    ))}
                                </Box>
                            </div>
                        </>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2
                        }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFinish}
                                sx={{
                                    borderRadius: '25px',
                                    padding: '1px 20px'
                                }}
                            >
                                Submit
                            </Button>
                        ) : (
                            <>
                                {activeStep === 0 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmitUser}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Sign up
                                    </Button>
                                )}
                                {activeStep === 1 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmitProject}
                                        sx={{
                                            borderRadius: '25px',
                                            padding: '1px 20px'
                                        }}
                                    >
                                        Create project
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>
                </form>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    elevation={6}
                    variant="filled"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Welcome to Wave Web"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have been successfully registered!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="primary"
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SignupComponent;
