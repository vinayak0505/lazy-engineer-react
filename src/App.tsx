import React, { useEffect } from 'react';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Router from './Router';
import { useAppDispatch } from './store';
import { verifyToken } from './redux/reducer/auth.reducer';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(verifyToken());
	}, []);

	return (
		<div className="App">
			<Router />
			<ToastContainer />
		</div>
	);
}

export default App;
