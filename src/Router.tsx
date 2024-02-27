import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Auth from './pages/auth';
import { authSelector } from './redux/reducer/auth.reducer';

function Router() {
	const { user } = useSelector(authSelector);
	
	// protected to prevent route that should not be acceble without logout
	const Protected = ({ children }: { children: JSX.Element | null }) => {
		if (!user) {
			return <Navigate to="/auth" replace />;
		}
		return children;
	};

	const LoggedIn = ({ children }: { children: JSX.Element }) => {
		if (user) {
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
					<Auth />
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
