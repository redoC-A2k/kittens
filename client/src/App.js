import { useEffect, useState } from 'react';
import Game from './screens/Game';
import Login from './screens/Login';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserName } from './redux/slices/username';
import { Toaster } from 'react-hot-toast'

function App() {
    let username = useSelector(selectUserName)
    const navigate = useNavigate();
    useEffect(() => {
        // if (username == "") {
        //     navigate('/login')
        // } else navigate("/")
    }, [username])
    return (
        <>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            padding: '10px',
                            marginTop: "6rem"
                        },
                    },
                }} />
            <Routes>
                <Route exact path="/" element={<Game />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
