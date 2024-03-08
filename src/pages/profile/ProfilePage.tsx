import Styles from './ProfilePage.module.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';

const ProfilePage = () => {
	return (
		<div className={Styles.container + ' bg-gray-800'}>
			<img
				src="https://picsum.photos/200"
				alt="Profile Picture"
				className={Styles.profile_picture}
			/>
			<div className={Styles.info + ' text-white'}>
				<h1>John Doe</h1>
				<div className={Styles.contact_info}>
					<p className={Styles.contact}>johndoe@example.com</p>
					<p className={Styles.social}>
						<a href="#">
							<InstagramIcon />
						</a>
						<a href="#">
							<XIcon />
						</a>
						<a href="#">
							<GitHubIcon />
						</a>
					</p>
				</div>
				<p className={Styles.profession}>Software Engineer at ABC Company</p>
				<p className={Styles.college}>College: Anytown University</p>
				<div className={Styles.data_counts}>
					<p>
						Notes: <span className={Styles.count}>10</span>
					</p>
					<p>
						Paper: <span className={Styles.count}>5</span>
					</p>
					<p>
						Practical File: <span className={Styles.count}>20</span>
					</p>
					<p>
						Books: <span className={Styles.count}>3</span>
					</p>
					<p>
						Jobs: <span className={Styles.count}>12</span>
					</p>
				</div>
				<p className={Styles.about}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
					exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<button className={Styles.edit_button + ' bg-blue-700'}>Edit Profile</button>
			</div>
		</div>
	);
};
export default ProfilePage;
