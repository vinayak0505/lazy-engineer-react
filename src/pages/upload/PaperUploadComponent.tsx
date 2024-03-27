import { useState } from 'react';
import UploadUI from '../../components/UploadUI';
import { InputDropDown } from '../../components/drop_down/DropDown';
import { PaperTags, semesters, units } from '../../utility/constants';
import InputChip from '../../components/chips/InputChip';
import Button from '../../components/buttons/Button';
import ContentService from '../../redux/service/content.service';
import { useAppDispatch } from '../../store';
import { helperAction } from '../../redux/reducer/helper.reducer';

const DefaultPaperValue = {
	title: '',
	about: '',
	subject: '',
	semester: '',
	unit: '',
	college: '',
	chapter: '',
	topic: ''
};

export const PaperUploadComponent = () => {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [tags, setTags] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	const [paper, setPaper] = useState(DefaultPaperValue);
	const [loading, setLoading] = useState(false);

	const updatePaper = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		setPaper({
			...paper,
			[name]: value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData(e.currentTarget as HTMLFormElement);
            tags.forEach((tag) => formData.append('tags[]', tag));
			const data = await ContentService.addPaper(formData);
			if(data.status != "success") throw new Error(data.message ?? "Something went wrong");
			setFile(null);
			setImage(null);
			setTags([]);
			setPaper(DefaultPaperValue);
			dispatch(helperAction.customToast('Paper uploaded successfully'));
		} catch (error: any) {
			dispatch(helperAction.customToast(error?.message ?? 'Something went wrong'));
			console.log(error);
		} finally{
			setLoading(false);
		}
	};

	return (
		<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="file"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload File
				</label>
				<UploadUI setFile={setFile} required name='file' id="file">
					<span
						className={
							'bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ' +
							(file ? 'dark:text-white dark' : 'dark:text-gray-400')
						}
					>
						{file?.name ?? 'document.pdf'}
					</span>
				</UploadUI>
			</div>
			<div className="mt-4">
				<label
					htmlFor="image"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload Image
				</label>
				<UploadUI setFile={setImage} name='image' id='image'>
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
					value={paper?.title}
					onChange={updatePaper}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="File Title"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="about"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					About
				</label>
				<textarea
					name="about"
					value={paper?.about}
					onChange={updatePaper}
					id="about"
					rows={4}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Leave a comment..."
				></textarea>
			</div>
			<div className="mt-4">
				<label
					htmlFor="subject"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Subject
				</label>
				<input
					name="subject"
					value={paper?.subject}
					onChange={updatePaper}
					type="text"
					id="subject"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="File Subject"
					required
				/>
			</div>
			<div className="mt-4 flex gap-7">
				<span>
					<label
						htmlFor="semester"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Semester
					</label>
					<InputDropDown
						name="semester"
						value={paper?.semester}
						onChange={updatePaper}
						title="Select Semester"
						options={semesters}
						required
						className="w-44 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					/>
				</span>
				<span>
					<label
						htmlFor="unit"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Unit
					</label>
					<InputDropDown
						name="unit"
						value={paper?.unit}
						onChange={updatePaper}
						title="Select Unit"
						options={units}
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
					College
				</label>
				<input
					type="text"
					id="college"
					name="college"
					value={paper?.college}
					onChange={updatePaper}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="College"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="chapter"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Chapter
				</label>
				<input
					type="text"
					id="chapter"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="Chapter"
					name="chapter"
					value={paper?.chapter}
					onChange={updatePaper}
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="topic"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Topic
				</label>
				<input
					type="text"
					id="topic"
					name="topic"
					value={paper?.topic}
					onChange={updatePaper}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="Topic"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="tags"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Tags
				</label>
				<InputChip options={PaperTags} selected={tags} setSelected={setTags} />
			</div>
			<div className="mt-4 flex justify-center">
				<Button wide type="submit" disabled={loading}>
					{loading ? 'Submitting' : 'Submit'}
				</Button>
			</div>
		</form>
	);
};