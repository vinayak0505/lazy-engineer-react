import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/Auth';
import { UserType } from './redux/reducer/auth.reducer';
import Home from './pages/home/Home';

function Router({ user }: { user: UserType }) {
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
					element: <Home/>
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
