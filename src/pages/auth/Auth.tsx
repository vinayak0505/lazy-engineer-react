import React, { useState } from 'react';
import Login from './login/Login';
import SignUp from './sign_up/SignUp';
const Auth = () => {
	const [showLogin, setShowLogin] = useState(true);

	return (
		<>
			<div> auth</div>
			{showLogin ? <Login /> : <SignUp />}
			<button onClick={() => setShowLogin(!showLogin)}> {showLogin ? 'Register' : 'Login'}</button>
		</>
	);
};

export default Auth;
