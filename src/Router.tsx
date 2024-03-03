import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/Auth';
import { UserType } from './redux/reducer/auth.reducer';
import Home from './pages/home/Home';
import Nav from './components/nav/Nav';
import SideBar from './components/sidebar/SideBar';
import NotesPage from './pages/notes/NotesPage';
import PaperPage from './pages/paper/PaperPage';
import BooksPage from './pages/books/BooksPage';

function Router({ user }: { user: UserType }) {
	// todo temp setting user to work without auth
	// user = { email: 'vinayakaggarwal05@gmail.com', fullName: 'Vinayak Agarwal', timeCreated: '', univercity: '', profile: null };
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
			path: '*',
			element: <Navigate to="/" replace />
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
					element: (
						<div className="h-56 w-32 relative">
							<img src="https://placekitten.com/600" className='object-cover h-56 w-32 rounded-s-lg' alt="" />
							<div className="absolute bottom-0 right-0">
							<span className="bg-blue-100 text-blue-800 text-xs font-medium m-0.5 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">200 pages</span>
							</div>
						</div>
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
