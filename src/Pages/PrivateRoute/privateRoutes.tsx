import { useEffect, useState } from 'react';
import { authenticateUser, createSession } from '../../services/api';
import LoginPage from '../Login/LoginPage';
import { Outlet } from 'react-router-dom';

const PrivateRoute =  () => {

    const [error, setError] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string>(localStorage.getItem("session_id") as string);
    const [authed, setAuthed] = useState(false)

    useEffect(()=>{
        const useAuth = async () => {

        const params = new URLSearchParams(window.location.search);
        const requestToken = params.get("request_token");
        const approved = params.get("approved");

        if (approved === "true" && requestToken) {
            try {
            const sessionId = await createSession(requestToken);
            setSessionId(sessionId);
            localStorage.setItem("session_id", sessionId);
            window.history.replaceState(null, "", window.location.origin);
            } catch (error: any) {
            console.error("Error creating session:", error.message);
            setError("Failed to create a session. Please try again.");
            }
        } else{
            try {
                await authenticateUser();
                } catch (error: any) {
                console.error("Error during login:", error.message);
                setError("Failed to start authentication. Please try again.");
                }
        }
    };
        useAuth()
        setAuthed(true)
    }, [])

  return authed ? <Outlet/> : <LoginPage/> ;
};

export default PrivateRoute;
