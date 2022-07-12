import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const auth = {user:'mamun'}
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    if(auth.user){
        navigate(from, { replace: true });
    }
    return (
        <div>
            This is Login
        </div>
    );
};

export default Login;