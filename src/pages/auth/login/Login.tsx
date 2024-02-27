import React, { useState } from 'react';
import { authSelector, loginUser } from '../../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(email, password);
		dispatch(loginUser({ email, password }));
	};

	const { loading } = useSelector(authSelector);

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<br />
				<label>
					Password{' '}
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<input type="submit" value={loading ? 'Loading...' : 'Submit'} />
			</form>
		</div>
	);
};

export default Login;
