import { logoutUser } from '../../redux/reducer/auth.reducer';
import { useAppDispatch } from '../../store';
import styles from './Home.module.scss';

const Home = () => {
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(logoutUser());
	};
	return (
		<>
			<p className={styles.title}>i am home</p>
			<button onClick={logout}>log out</button>
		</>
	);
};
export default Home;
