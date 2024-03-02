import { useEffect, useState } from 'react';
import Game from './screens/Game';
import Login from './screens/Login';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserName } from './redux/slices/username';
import { Toaster } from 'react-hot-toast'
import { Socket } from './utils/Socket';

function App() {
    let username = useSelector(selectUserName)
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        if (username == "") {
            navigate('/login')
        } else {
            navigate("/")
            setSocket(new Socket(username))
        }
    }, [username])

    return (
        <>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            padding: '10px',
                            marginTop: "1rem"
                        },
                        duration: 500
                    },
                }} />
            <Routes>
                <Route exact path="/" element={<Game socket={socket} />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
