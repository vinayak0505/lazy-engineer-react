import { UserType } from '../../redux/reducer/auth.reducer';
import Styles from './SideBar.module.scss';

import Jobs from '../../assets/jobs';
import Books from '../../assets/books';
import Notes from '../../assets/notes';
import Paper from '../../assets/paper';
import Practical from '../../assets/practical';
import { NavLink } from 'react-router-dom';
const SideBar = ({ user, children }: { user: UserType; children: JSX.Element | undefined }) => {
	return (
		<div className={Styles.main}>
			<aside
				id="separator-sidebar"
				className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto">
					<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<div className="flex flex-col items-center pb-6 pt-6">
							<img
								className="w-24 h-24 mb-3 rounded-full shadow-lg"
								src={user?.profile ?? './images/user.jpeg'}
								alt={user?.fullName}
							/>
							<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
								{user?.fullName}
							</h5>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								Visual Designer
							</span>
						</div>
					</div>

					<ul className="mt-4 space-y-2 font-medium bg-gray-50 dark:bg-gray-800 rounded-lg  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
						<li>
							<NavLink
								to="/notes"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<Notes />
								<span className="ms-3">Notes</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/paper"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<Paper />
								<span className="ms-3">Paper</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/practical"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<Practical />
								<span className="ms-3">Practical File</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/books"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<Books />
								<span className="ms-3">Books</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/jobs"
								className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
							>
								<Jobs />
								<span className="ms-3">Jobs</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</aside>
			<div className="p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
					{children}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
