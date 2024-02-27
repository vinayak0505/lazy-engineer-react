import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

function App() {
	return (
		<div className="App">
      <Router/>
			<ToastContainer />
		</div>
	);
}

export default App;
