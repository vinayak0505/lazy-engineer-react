import { UserType } from '../../redux/reducer/auth.reducer';
import Styles from './SideBar.module.scss';

import Jobs from '../../assets/jobs';
import Books from '../../assets/books';
import Notes from '../../assets/notes';
import Paper from '../../assets/paper';
import Practical from '../../assets/practical';
import { NavLink, useLocation } from 'react-router-dom';
const SideBar = ({ user, children }: { user: UserType; children: JSX.Element | undefined }) => {
	const location = useLocation();
	return (
		<div className={Styles.main}>
			<aside
				id="separator-sidebar"
				className="fixed left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full overflow-y-auto px-3 py-4">
					{user && location.pathname != '/profile' && (
						<div className="mb-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
							<div className="flex flex-col items-center pb-6 pt-6">
								<img
									className="mb-3 h-24 w-24 rounded-full shadow-lg"
									src={user?.imageLink ?? './images/user.jpeg'}
									alt={user?.fullName}
								/>
								<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
									{user?.fullName}
								</h5>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									{user?.email}
								</span>
							</div>
						</div>
					)}

					<ul className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 font-medium shadow dark:border-gray-700 dark:bg-gray-800">
						<li>
							<NavLink
								to="/notes"
								className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<Notes />
								<span className="ms-3">Notes</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/paper"
								className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<Paper />
								<span className="ms-3">Question Papers</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/practical"
								className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<Practical />
								<span className="ms-3">Practical File</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/books"
								className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<Books />
								<span className="ms-3">Books</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/jobs"
								className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								<Jobs />
								<span className="ms-3">Jobs</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</aside>
			<aside
				id="separator-sidebar-right"
				className="fixed right-0 h-screen w-64 translate-x-full transition-transform lg:-translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full overflow-y-auto px-3 py-4">
					<div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
						<div className="flex flex-col items-center pb-6 pt-6">
							{/* to do add advertisement */}
							advertisement
						</div>
					</div>
				</div>
			</aside>
			<div className="p-4 sm:ml-64 lg:mr-64">
				<div className="rounded-lg border-2 border-dashed border-gray-200 p-4 pb-0 dark:border-gray-700">
					{children}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
