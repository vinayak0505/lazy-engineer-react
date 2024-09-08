import Styles from './ProfilePage.module.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { UserType } from '../../redux/reducer/auth.reducer';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { useParams } from 'react-router-dom';
import AuthService from '../../redux/service/auth.service';
import { helperAction } from '../../redux/reducer/helper.reducer';

const ViewOnlyProfilePage = () => {
	const dispatch = useAppDispatch();
	const id = useParams().id;
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		if (id == null) return;
		AuthService.getProfile(id)
			.then((res) => {
				if (res.status == 'success') setUser(res.data);
				else throw new Error(res.message ?? 'User Not found');
			})
			.catch((error) => {
				dispatch(helperAction.customToast(error?.message ?? 'Something went wrong'));
			});
	}, [id]);

	if (user == null) return <>Loading...</>;

	return (
		<div className={Styles.container + ' mb-4 bg-gray-800'}>
			<img
				src={user?.imageLink ?? './images/user.jpeg'}
				alt="Profile Picture"
				className={Styles.profile_picture}
			/>
			<div className={Styles.info + ' text-white'}>
				<h1>{user?.fullName}</h1>
				<div className={Styles.contact_info}>
					<p className={Styles.contact}>{user?.email}</p>
					<p className={Styles.social}>
						{user?.linkedin && (
							<a href={user?.linkedin} target="_blank" rel="noreferrer">
								<LinkedInIcon />
							</a>
						)}
						{user?.github && (
							<a href={user?.github} target="_blank" rel="noreferrer">
								<GitHubIcon />
							</a>
						)}
						{user?.twitter && (
							<a href={user?.twitter} target="_blank" rel="noreferrer">
								<XIcon />
							</a>
						)}
						{user?.instagram && (
							<a href={user?.instagram} target="_blank" rel="noreferrer">
								<InstagramIcon />
							</a>
						)}
					</p>
				</div>
				{user?.company && user?.designation && (
					<p className={Styles.profession}>
						{user?.designation} at {user.company} Company
					</p>
				)}
				{user?.university && <p className={Styles.college}>University: {user.university}</p>}
				<div className={Styles.data_counts}>
					<p>
						Notes: <span className={Styles.count}>{user?.notesCount}</span>
					</p>
					<p>
						Paper: <span className={Styles.count}>{user?.papersCount}</span>
					</p>
					<p>
						Practical File: <span className={Styles.count}>{user?.filesCount}</span>
					</p>
					<p>
						Books: <span className={Styles.count}>{user?.booksCount}</span>
					</p>
					<p>
						Jobs: <span className={Styles.count}>{user?.jobsCount}</span>
					</p>
				</div>
				{user?.bio && <p className={Styles.about}>{user?.bio}</p>}
			</div>
		</div>
	);
};

export default ViewOnlyProfilePage;
