import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/Auth';
import { authSelector } from './redux/reducer/auth.reducer';
import Home from './pages/home/Home';
import Nav from './components/nav/Nav';
import SideBar from './components/sidebar/SideBar';
import NotesPage from './pages/notes/NotesPage';
import PaperPage from './pages/paper/PaperPage';
import BooksPage from './pages/books/BooksPage';
import ProfilePage from './pages/profile/ProfilePage';
import PracticalPage from './pages/practical/PracticalPage';
import JobsPage from './pages/jobs/JobsPage';
import { useSelector } from 'react-redux';
import UploadPage from './pages/upload/UploadPage';

function Router() {
	// todo temp setting user to work without auth
	// user = { email: 'vinayakaggarwal05@gmail.com', fullName: 'Vinayak Agarwal', timeCreated: '', univercity: '', profile: null };
	const user = useSelector(authSelector).user;

	// protected to prevent route that should not be acceble without logout
	const Protected = ({ children }: { children: JSX.Element | null }) => {
		// if (!user) {
		// 	localStorage.setItem('path_history', window.location.pathname);
		// 	return <Navigate to="/login" replace />;
		// }
		return children;
	};

	const LoggedIn = ({ children }: { children: JSX.Element }) => {
		if (user) {
			const path = localStorage.getItem('path_history') ?? '/';
			localStorage.removeItem('path_history');
			return <Navigate to={path} replace />;
		}
		return children;
	};

	// routes
	const browserRouter = createBrowserRouter([
		{
			path: '/login',
			element: (
				<LoggedIn>
					<Auth showLogin={true} />
				</LoggedIn>
			)
		},
		{
			path: '/register',
			element: (
				<LoggedIn>
					<Auth showLogin={false} />
				</LoggedIn>
			)
		},
		{
			path: '*',
			element: <Navigate to="/" replace />
		},
		{
			path: '/',
			element: (
				<>
					<Nav user={user} />
					<SideBar user={user}>
						<Outlet />
					</SideBar>
				</>
			),
			children: [
				{
					index: true,
					element: <Home />
				},
				{
					path: '/profile',
					element: (
						<Protected>
							<ProfilePage />
						</Protected>
					)
				},
				{
					path: '/upload/:uploadType',
					element: (
						<Protected>
							<UploadPage />
						</Protected>
					)
				},
				{
					path: '/paper',
					element: <PaperPage />
				},
				{
					path: '/notes',
					element: <NotesPage />
				},
				{
					path: '/books',
					element: <BooksPage />
				},
				{
					path: '/practical',
					element: <PracticalPage />
				},
				{
					path: '/jobs',
					element: <JobsPage />
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
