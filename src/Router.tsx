import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/Auth';
import { UserType } from './redux/reducer/auth.reducer';
import Home from './pages/home/Home';
import Nav from './components/nav/Nav';
import SideBar from './components/sidebar/SideBar';

function Router({ user }: { user: UserType }) {
	// todo temp setting user to work without auth
	user = { email: 'vinayakaggarwal05@gmail.com', fullName: 'Vinayak Agarwal', timeCreated: '', univercity: '', profile: null };
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
					<>
						<Nav />
						<SideBar user={user}>
							<Outlet />
						</SideBar>
					</>
				</Protected>
			),
			children: [
				{
					index: true,
					element: <Home />
				},
				{
					path: '/profile',
					element: <div>i am profile</div>
				},
				{
					path: '/notes',
					element: <div>i am notes</div>
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
