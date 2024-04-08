import { useState } from 'react';
import UploadUI from '../../components/UploadUI';
import { InputDropDown } from '../../components/custom_input/DropDown';
import { ExperienceLevels, JobTypes, JobsTags } from '../../utility/constants';
import InputChip from '../../components/chips/InputChip';
import Button from '../../components/buttons/Button';
import ContentService from '../../redux/service/content.service';
import { useAppDispatch } from '../../store';
import { helperAction } from '../../redux/reducer/helper.reducer';
import { getCurrentDate } from '../../utility/date.helper';

const DefaultNoteValue = {
	title: '',
	company: '',
	aboutCompany: '',
	expectedSalary: '',
	profile: '',
	experienceLevel: '',
	jobType: '',
	location: '',
	applyLink: ''
};

export const JobsUploadComponent = () => {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [skills, setSkills] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	const [jobs, setJobs] = useState(DefaultNoteValue);
	const [loading, setLoading] = useState(false);

	const updateJobs = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setJobs({
			...jobs,
			[name]: value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData(e.currentTarget as HTMLFormElement);
			skills.forEach((skill) => formData.append('skillsNeeded[]', skill));
			formData.append('datePosted', getCurrentDate());
			const data = await ContentService.addJob(formData);
			if (data.status != 'success') throw new Error(data.message ?? 'Something went wrong');
			setImage(null);
			setFile(null);
			setSkills([]);
			setJobs(DefaultNoteValue);
			dispatch(helperAction.customToast('Jobs uploaded successfully'));
		} catch (error: any) {
			dispatch(helperAction.customToast(error?.message ?? 'Something went wrong'));
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<form className="max-w-sm mx-auto mb-4" onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="file"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload Logo
				</label>
				<UploadUI setFile={setFile} required name="file" id="file">
					<span
						className={
							'bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ' +
							(file ? 'dark:text-white dark' : 'dark:text-gray-400')
						}
					>
						{file?.name ?? 'profile.png'}
					</span>
				</UploadUI>
			</div>
			<div className="mt-4">
				<label
					htmlFor="image"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload Company Image
				</label>
				<UploadUI setFile={setImage} name="image" id="image">
					<span
						className={
							'bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500  ' +
							(image ? 'dark:text-white dark' : 'dark:text-gray-400')
						}
					>
						{image?.name ?? 'image.jpg'}
					</span>
				</UploadUI>
			</div>
			<div className="mt-4">
				<label
					htmlFor="title"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={jobs?.title}
					onChange={updateJobs}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="File Title"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="profile"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Jobs Profile
				</label>
				<textarea
					name="profile"
					value={jobs?.profile}
					onChange={updateJobs}
					id="profile"
					rows={4}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Explain what type of work that needs to be done"
					required
				></textarea>
			</div>
			<div className="mt-4">
				<label
					htmlFor="expectedSalary"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Salary Range
				</label>
				<input
					type="text"
					id="expectedSalary"
					name="expectedSalary"
					value={jobs?.expectedSalary}
					onChange={updateJobs}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="Salary Range"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="company"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Company Name
				</label>
				<input
					type="text"
					id="company"
					name="company"
					value={jobs?.company}
					onChange={updateJobs}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="Company Name"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="aboutCompany"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					About Company
				</label>
				<textarea
					name="aboutCompany"
					value={jobs?.aboutCompany}
					onChange={updateJobs}
					id="aboutCompany"
					rows={4}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Something about your company. For example: The company's mission, vision, and values. Write a comment..."
				></textarea>
			</div>
			<div className="mt-4 flex gap-7">
				<span>
					<label
						htmlFor="experienceLevel"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Experience Level
					</label>
					<InputDropDown
						name="experienceLevel"
						value={jobs?.experienceLevel}
						onChange={updateJobs}
						title="Select Experience Level"
						options={ExperienceLevels}
						required
						className="w-44 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					/>
				</span>
				<span>
					<label
						htmlFor="jobType"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Job Type
					</label>
					<InputDropDown
						name="jobType"
						value={jobs?.jobType}
						onChange={updateJobs}
						title="Select Job Type"
						options={JobTypes}
						required
						className="w-44 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					/>
				</span>
			</div>
			<div className="mt-4">
				<label
					htmlFor="college"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Location Type
				</label>
				<input
					type="text"
					id="location"
					name="location"
					value={jobs?.location}
					onChange={updateJobs}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="Location type (and place if from office)"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="applyLink"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Apply Link
				</label>
				<input
					type="text"
					id="applyLink"
					name="applyLink"
					value={jobs?.applyLink}
					onChange={updateJobs}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="Link to apply"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="tags"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Skills Needed
				</label>
				<InputChip options={JobsTags} selected={skills} setSelected={setSkills} />
			</div>
			<div className="mt-4 flex justify-center">
				<Button wide type="submit" disabled={loading}>
					{loading ? 'Submitting' : 'Submit'}
				</Button>
			</div>
		</form>
	);
};
