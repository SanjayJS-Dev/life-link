import * as React from 'react';
import Logo from '../Images/logo500.jpg'
import Banner from '../Images/blood.png'
import { Button,TextField } from '@mui/material';
import { AccountCircle, ReportProblem, VerifiedUser, VolunteerActivism } from '@mui/icons-material';

function HomePage() {

    document.title = "HomePage :: LifeLink"

    return (
        <React.Fragment>
            <div className="shadow-md w-full p-3 lg:px-10">
                <div className="container mx-auto flex flex-row justify-between">
                    <div className="flex flex-row place-items-center">
                        <img src={Logo} alt='Logo' className="inline-block align-middle h-20" />
                        <span className="text-3xl p-3 text-red-700 font-display">LifeLink</span>
                    </div>
                    <div className="flex flex-row place-items-center">
                        <span className="text-red-700 hover:font-extrabold hover:text-lg transition-all cursor-pointer"> <VolunteerActivism/> Volunteer Registration  </span>
                    </div>
                    <div className="flex flex-row place-items-center">
                        <Button variant="contained" color="success" endIcon={<AccountCircle />} onClick={()=>{}}>Login</Button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-10 flex flex-row">
                <div className="w-1/2 place-items-center">
                    <center> <img src={Banner} alt="Banner" className="align-middle" /> </center>
                </div>
                <div className="w-1/2 place-items-center align-middle">
                    <div className="p-3 bg-red-200 w-fit border rounded text-red-700"> <ReportProblem/> Alert: Beware of Fake Blood Donation Requests! </div>
                    <h1 className="py-5 font-bold text-3xl text-red-700">Verify Donation Requests</h1>
                    <div className="flex flex-row place-items-center gap-2">
                        <span>Enter Request ID</span>
                        <TextField id="reqID" label="Enter Request ID" size="small" sx={{color:"#ba000d"}} variant="outlined" />
                        <Button variant="outlined" endIcon={<VerifiedUser/>}>Validate </Button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 bg-red-200 py-5 p-3 w-full lg:px-10">
                <div className="container mx-auto w-full flex flex-row justify-between">
                    <span className="text-red-700">  Copyright &copy; 2024. LifeLink</span>
                    <span className="text-cyan-600">Be a Part of LifeLink. Register your Institution</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomePage;