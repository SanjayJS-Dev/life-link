import * as React from 'react';
import Logo from '../Images/logo500.jpg';
import Banner from '../Images/blood.png';
import {
    Button,
    TextField,
    Modal,
    Box,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    InputAdornment,
    Alert,
    LinearProgress
} from '@mui/material';
import { AccountCircle, ReportProblem, VerifiedUser, VolunteerActivism, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function Loading() {
    return (
        <Box sx={{ width: '100%', marginTop: "15px", marginBottom: "15px" }}>
            <LinearProgress />
        </Box>
    )
}

function HomePage() {

    const navigate = useNavigate();
    document.title = "HomePage :: LifeLink"

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAlert(null);
        setAlert2(null);
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [alert_val, setAlert] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const handleSubmitILog = (event) => {
        event.preventDefault()
        let email = document.getElementById("emailid").value
        let psswd = document.getElementById("password").value
        if (email === "") {
            setAlert("Enter Email ID")
        } else if (psswd.length < 8) {
            setAlert("Enter a Valid Password")
        } else if (psswd === "") {
            setAlert("Enter Password")
        }
        else {
            setLoading(true);
            setAlert(null);
            setAlert2(null);
            axios.post("http://localhost:8080/validateHospLogin", {email:email,psswd:psswd})
            .then(() => {
                navigate('/nopage')
            })
            .catch((err)=>{
                if(err.response) {
                    if(err.response.status == "401") {
                        setLoading(false)
                        setAlert("Invalid Login Credentials")
                    }
                } else {
                    setLoading(false)
                    setAlert("Can't connect to database")
                }
            })
        }
    }

    const [alert_val2, setAlert2] = React.useState(null)
    const verifyRequest = (event) => {
        let reqId = document.getElementById("reqID").value
        if (reqId === "") {
            setAlert2("Enter Request ID")
        }
    }

    return (
        <React.Fragment>
            <div className="shadow-md w-full p-3 lg:px-10">
                <div className="container mx-auto flex flex-row justify-between">
                    <div className="flex flex-row place-items-center">
                        <img src={Logo} alt='Logo' className="inline-block align-middle h-20" />
                        <span className="text-3xl p-3 text-red-700 font-display">LifeLink</span>
                    </div>
                    <div className="flex flex-row place-items-center">
                        <span className="text-red-700 hover:font-extrabold hover:text-lg transition-all cursor-pointer"> <Link to="/v_register"> <VolunteerActivism /> Volunteer Registration </Link>  </span>
                    </div>
                    <div className="flex flex-row place-items-center">
                        <Button onClick={handleOpen} sx={{fontFamily:"inherit"}} variant="contained" color="success" endIcon={<AccountCircle />}>Login</Button>
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                                <Typography sx={{fontFamily:"inherit"}} id="modal-modal-title" variant="h6" component="h2">
                                    <AccountCircle /> Institution Login
                                </Typography>
                                <Box component="form" onSubmit={handleSubmitILog}>
                                    <br />
                                    {loading===true && <Loading/>}
                                    {alert_val && <Alert sx={{fontFamily:"inherit"}} severity="error">{alert_val}</Alert>}
                                    <TextField sx={{ color: "#ba000d", marginTop: "15px" }} fullWidth id="emailid" label="Enter Email ID" size="small" variant="outlined" />
                                    <FormControl fullWidth size="small" sx={{ marginTop: "15px" }} variant="outlined">
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    <Button fullWidth type="submit" variant="contained" sx={{ marginTop: "15px", fontFamily:"inherit" }} color="success" endIcon={<AccountCircle />}>Login</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="container md:mx-auto px-10 py-10 flex flex-row">
                <div className="w-1/2 place-items-center">
                    <center> <img src={Banner} alt="Banner" className="align-middle" /> </center>
                </div>
                <div className="w-1/2 place-items-center align-middle">
                    <div className="p-3 bg-red-200 w-fit border rounded text-red-700"> <ReportProblem /> Alert: Beware of Fake Blood Donation Requests! </div>
                    <h1 className="py-5 font-bold text-3xl text-red-700">Verify Donation Requests</h1>
                    {alert_val2 && <Alert severity="error" sx={{ width: "300px", marginBottom: "15px", fontFamily:"inherit" }}>{alert_val2}</Alert>}
                    <div className="flex flex-row place-items-center gap-2">
                        <span>Enter Request ID</span>
                        <TextField id="reqID" label="Enter Request ID" size="small" sx={{ color: "#ba000d" }} variant="outlined" />
                        <Button sx={{fontFamily:"inherit"}} onClick={verifyRequest} variant="outlined" endIcon={<VerifiedUser/>}>Validate </Button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 bg-red-200 py-5 p-3 w-full lg:px-10">
                <div className="container mx-auto w-full flex flex-row justify-between">
                    <span className="text-red-700">  Copyright &copy; 2024. LifeLink</span>
                    <span className="text-cyan-600"> <Link to="h_register"> Be a Part of LifeLink. Register your Institution </Link> </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomePage;