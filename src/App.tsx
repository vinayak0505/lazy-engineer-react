import React, { useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Router from './Router';
import { useAppDispatch } from './store';
import { authSelector, verifyToken } from './redux/reducer/auth.reducer';
import { useSelector } from 'react-redux';

function App() {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(verifyToken());
	}, []);
	
	const { user } = useSelector(authSelector);

	return (
		<div className="App">
			<Router user={user}/>
			<ToastContainer />
		</div>
	);
}

export default App;
