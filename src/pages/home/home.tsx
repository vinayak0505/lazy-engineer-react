import { logoutUser } from '../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../store';

const Home = () => {
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(logoutUser());
	};
	return (
		<>
			<p>i am home</p>
			<button onClick={logout}>log out</button>
		</>
	);
};
export default Home;
