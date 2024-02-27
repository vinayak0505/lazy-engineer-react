import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { useUserValue } from "./Logic/auth";

function Router() {
	const [loged, setLoged] = useState(false);

	// const dispatch = useDispatch();

	// protected to prevent route that should not be acceble without logout
	const Protected = ({ children }: { children: JSX.Element | null }) => {
		if (!loged) {
			return <Navigate to="/auth" replace />;
		}
		return children;
	};

	const LoggedIn = ({ children }: { children: JSX.Element }) => {
		if (loged) {
			return <Navigate to="/" replace />;
		}
		return children;
	};

	// routes
	const browserRouter = createBrowserRouter([
		{
			path: '/auth',
			element: (
				<LoggedIn>
					<div>i on auth</div>
				</LoggedIn>
			),
			children: []
		},
		{
			path: '/',
			element: (
				<Protected>
					<Outlet />
				</Protected>
			),
			children: [
        {
          index: true,
					element: <div>i am index</div>
        },
				{
					path: '/home',
					element: <div>i am home</div>
				}
			]
		}
	]);

	// if (loading) return <img className="loading" src="/loading.gif" alt="loading" />;

	return (
		<>
			<RouterProvider router={browserRouter} />
		</>
	);
}

export default Router;
