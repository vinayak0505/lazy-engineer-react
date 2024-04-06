import Styles from './ProfilePage.module.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useSelector } from 'react-redux';
import { UserType, authSelector, updateUser } from '../../redux/reducer/auth.reducer';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';

const ProfilePage = () => {
	const user = useSelector(authSelector).user;

	const dispatch = useAppDispatch();

	const [isEdit, setIsEdit] = useState(false);

	const [editUser, setEditUser] = useState(user ?? {});

	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		if (isEdit) setIsEdit(false);
	}, [user]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(updateUser({ arg: editUser as UserType, image: file }));
	};

	const changeValue = (key: string, value: string) => {
		setEditUser({
			...editUser,
			[key]: value
		});
	};

	return (
		<div className={Styles.container + ' bg-gray-800 mb-4'}>
			{isEdit ? (
				<div className="h-fit w-fit relative">
					<input
						className={Styles.profile_picture + ' absolute z-10 opacity-0 cursor-pointer'}
						type="file"
						id="avatar"
						name="avatar"
						accept="image/png, image/jpeg"
						onChange={(e) => {
							if (e.target.files) {
								setFile(e.target.files[0]);
							}
						}}
					/>
					<img
						src={file ? URL.createObjectURL(file) : ((editUser as UserType)?.imageLink ?? './images/user.jpeg')}
						alt="Profile Picture"
						className={Styles.profile_picture}
					></img>
				</div>
			) : (
				<img src={user?.imageLink ?? './images/user.jpeg'} alt="Profile Picture" className={Styles.profile_picture} />
			)}
			{isEdit ? (
				<EditProfile
					editUser={editUser as UserType}
					changeValue={changeValue}
					handleSubmit={handleSubmit}
				/>
			) : (
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
					<button
						className={Styles.edit_button + ' bg-blue-700'}
						onClick={() => setIsEdit(true)}
					>
						Edit Profile
					</button>
				</div>
			)}
		</div>
	);
};

const EditProfile = ({
	editUser,
	changeValue,
	handleSubmit
}: {
	editUser: UserType;
	changeValue: (key: string, value: string) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
	const { loading } = useSelector(authSelector);

	return (
		<div className={Styles.info + ' text-white'}>
			<form className={'space-y-4 md:space-y-6 '} onSubmit={handleSubmit}>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your FullName
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required={true}
						value={editUser?.fullName}
						onChange={(e) => changeValue('fullName', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your Designation
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.designation}
						onChange={(e) => changeValue('designation', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your Company
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.company}
						onChange={(e) => changeValue('company', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your University
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.university}
						onChange={(e) => changeValue('university', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Linkedin handle
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.linkedin}
						onChange={(e) => changeValue('linkedin', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Github handle
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.github}
						onChange={(e) => changeValue('github', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Twitter handle
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.twitter}
						onChange={(e) => changeValue('twitter', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Instagram handle
					</label>
					<input
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.instagram}
						onChange={(e) => changeValue('instagram', e.target.value)}
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Your Bio
					</label>
					<textarea
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={editUser?.bio}
						onChange={(e) => changeValue('bio', e.target.value)}
					/>
				</div>
				<input
					type="submit"
					className={Styles.edit_button + ' bg-blue-700'}
					value={loading ? 'Loading...' : "Save Profile"}
				/>
			</form>
		</div>
	);
};
export default ProfilePage;
