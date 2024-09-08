import { NavLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { UserType, logoutUser } from '../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../store';
import styles from './Nav.module.scss';
import { DropDown } from '../custom_input/DropDown';
import { useSelector } from 'react-redux';
import { alertSelector } from '../../redux/reducer/alert.reducer';
const Nav = ({ user }: { user: UserType }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const alertCount = useSelector(alertSelector).data?.length ?? 0;

	return (
		<nav className="fixed start-0 top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
			<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
				<NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="./images/logo.png" alt="logo" className={styles.logo} />
				</NavLink>
				<div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
					<button
						onClick={() => (user ? dispatch(logoutUser()) : navigate('/login'))}
						type="button"
						className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
					>
						{user ? 'Logout' : 'Login'}
					</button>
				</div>
				<div
					className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
					id="navbar-sticky"
				>
					<ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
						<li>
							<NavLink
								to="/"
								className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
								aria-current="page"
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/favorite"
								className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
							>
								Favorite
							</NavLink>
						</li>
						<li>
							<DropDown
								title="Upload"
								dropDownOption={[
									{
										name: 'Notes',
										onSelected: () => {
											navigate('/upload/notes');
										},
									},
									{
										name: 'Question Papers',
										onSelected: () => {
											navigate('/upload/papers');
										},
									},
									{
										name: 'Practicle Files',
										onSelected: () => {
											navigate('/upload/practicle');
										},
									},
									{
										name: 'Books',
										onSelected: () => {
											navigate('/upload/books');
										},
									},
									{
										name: 'Jobs',
										onSelected: () => {
											navigate('/upload/jobs');
										},
									},
								]}
								className="block inline-flex items-center rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
							/>
						</li>
						<li>
							<NavLink
								to="/profile"
								className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/notifications"
								className="relative block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
							>
								Notifications
								{alertCount > 0 && (
									<div className="absolute -end-4 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
										{alertCount}
									</div>
								)}
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
