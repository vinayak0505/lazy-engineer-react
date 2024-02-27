import React, { useState } from 'react';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
const Auth = () => {
	const [showLogin, setShowLogin] = useState(true);

	return (
		<>
			<div> auth</div>
			{showLogin ? <Login /> : <Register />}
			<button onClick={() => setShowLogin(!showLogin)}> {showLogin ? 'Register' : 'Login'}</button>
		</>
	);
};

export default Auth;
