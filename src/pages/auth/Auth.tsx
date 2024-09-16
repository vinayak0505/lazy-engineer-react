import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { loginUser, signUpUser, verifyToken } from '../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../store';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Auth = ({ showLogin }: { showLogin: boolean }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (showLogin) {
			dispatch(loginUser({ email, password }));
		} else {
			dispatch(signUpUser({ email, password, name }));
		}
	};

	useEffect(() => {
		const token = searchParams.get('token');

		if (token) {
			setSearchParams({ token: '' });
			dispatch(verifyToken({ token }));
		}
	}, []);

	const nav = useNavigate();

	return (
		<section className="bg-gray-50 p-5 dark:bg-gray-900">
			<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				<NavLink
					to="/"
					className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img className="mr-2 h-12" src="./images/logo.png" alt="logo" />
				</NavLink>
				<div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							{showLogin ? 'Welcome back' : 'Create a new account'}
						</h1>
						<form className={'space-y-4 md:space-y-6'} onSubmit={handleSubmit}>
							{!showLogin && (
								<div>
									<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
										Your Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										value={name}
										placeholder="••••••••"
										onChange={(e) => setName(e.target.value)}
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
										required={true}
									/>
								</div>
							)}
							<div>
								<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									value={email}
									type="email"
									name="email"
									id="email"
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									placeholder="name@yourmail.com"
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									value={password}
									placeholder="••••••••"
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
									required={true}
								/>
							</div>
							{showLogin && (
								<div className="flex items-center justify-between">
									<div className="flex items-start"></div>
									<div className="cursor-pointer text-sm font-medium text-blue-500 hover:underline dark:text-blue-600">
										Forgot password?
									</div>
								</div>
							)}
							<button
								type="submit"
								className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								{showLogin ? 'Sing in' : 'Sign up'}
							</button>
							{showLogin ? (
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{' '}
									<span
										className="cursor-pointer font-medium text-blue-600 hover:underline dark:text-blue-500"
										onClick={() => nav('/register')}
									>
										Sign up
									</span>
								</p>
							) : (
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{' '}
									<span
										className="font-medium text-blue-600 hover:underline dark:text-blue-500"
										onClick={() => nav('/login')}
									>
										Sign in
									</span>
								</p>
							)}
						</form>
						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="bg-white px-2 text-white dark:bg-gray-800">
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-3 gap-3">
								<div>
									<a
										href="#"
										className="flex w-full items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium shadow-sm hover:bg-blue-700 hover:text-white"
									>
										<FacebookIcon />
									</a>
								</div>
								<div>
									<a
										href="#"
										className="flex w-full items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium shadow-sm hover:bg-blue-700 hover:text-white"
									>
										<TwitterIcon />
									</a>
								</div>
								<div>
									<a
										href="http://localhost:9008/auth/google"
										className="hover:bg-blue-70 flex w-full items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium shadow-sm hover:bg-blue-700 hover:text-white"
									>
										<GoogleIcon />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Auth;
