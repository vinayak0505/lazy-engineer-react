import { useState } from 'react';
import UploadUI from '../../components/UploadUI';
import { InputDropDown } from '../../components/custom_input/DropDown';
import { NotesTags, semesters, units } from '../../utility/constants';
import InputChip from '../../components/chips/InputChip';
import Button from '../../components/buttons/Button';
import ContentService from '../../redux/service/content.service';
import { useAppDispatch } from '../../store';
import { helperAction } from '../../redux/reducer/helper.reducer';

const DefaultNoteValue = {
	title: '',
	about: '',
	subject: '',
	semester: '',
	unit: '',
	college: '',
	chapter: '',
	topic: '',
};

export const NotesUploadComponent = () => {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [tags, setTags] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	const [notes, setNotes] = useState(DefaultNoteValue);
	const [loading, setLoading] = useState(false);

	const updateNotes = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setNotes({
			...notes,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData(e.currentTarget as HTMLFormElement);
			tags.forEach((tag) => formData.append('tags[]', tag));
			const data = await ContentService.addNotes(formData);
			if (data.status != 'success') throw new Error(data.message ?? 'Something went wrong');
			setFile(null);
			setImage(null);
			setTags([]);
			setNotes(DefaultNoteValue);
			dispatch(helperAction.customToast('Notes uploaded successfully'));
		} catch (error: any) {
			dispatch(helperAction.customToast(error?.message ?? 'Something went wrong'));
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="mx-auto mb-4 max-w-sm" onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="file"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload File
				</label>
				<UploadUI setFile={setFile} required name="file" id="file">
					<span
						className={
							'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ' +
							(file ? 'dark dark:text-white' : 'dark:text-gray-400')
						}
					>
						{file?.name ?? 'document.pdf'}
					</span>
				</UploadUI>
			</div>
			<div className="mt-4">
				<label
					htmlFor="image"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload Image
				</label>
				<UploadUI setFile={setImage} name="image" id="image">
					<span
						className={
							'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ' +
							(image ? 'dark dark:text-white' : 'dark:text-gray-400')
						}
					>
						{image?.name ?? 'image.jpg'}
					</span>
				</UploadUI>
			</div>
			<div className="mt-4">
				<label
					htmlFor="title"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={notes?.title}
					onChange={updateNotes}
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="File Title"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="about"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					About
				</label>
				<textarea
					name="about"
					value={notes?.about}
					onChange={updateNotes}
					id="about"
					rows={4}
					className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Leave a comment..."
				></textarea>
			</div>
			<div className="mt-4">
				<label
					htmlFor="subject"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Subject
				</label>
				<input
					name="subject"
					value={notes?.subject}
					onChange={updateNotes}
					type="text"
					id="subject"
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="File Subject"
					required
				/>
			</div>
			<div className="mt-4 flex gap-7">
				<span>
					<label
						htmlFor="semester"
						className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						Semester
					</label>
					<InputDropDown
						name="semester"
						value={notes?.semester}
						onChange={updateNotes}
						title="Select Semester"
						options={semesters}
						required
						className="dark:shadow-sm-light block w-44 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					/>
				</span>
				<span>
					<label
						htmlFor="unit"
						className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						Unit
					</label>
					<InputDropDown
						name="unit"
						value={notes?.unit}
						onChange={updateNotes}
						title="Select Unit"
						options={units}
						required
						className="dark:shadow-sm-light block w-44 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					/>
				</span>
			</div>
			<div className="mt-4">
				<label
					htmlFor="college"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					College
				</label>
				<input
					type="text"
					id="college"
					name="college"
					value={notes?.college}
					onChange={updateNotes}
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="College"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="chapter"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Chapter
				</label>
				<input
					type="text"
					id="chapter"
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Chapter"
					name="chapter"
					value={notes?.chapter}
					onChange={updateNotes}
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="topic"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Topic
				</label>
				<input
					type="text"
					id="topic"
					name="topic"
					value={notes?.topic}
					onChange={updateNotes}
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Topic"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="tags"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Tags
				</label>
				<InputChip options={NotesTags} selected={tags} setSelected={setTags} />
			</div>
			<div className="mt-4 flex justify-center">
				<Button wide type="submit" disabled={loading}>
					{loading ? 'Submitting' : 'Submit'}
				</Button>
			</div>
		</form>
	);
};
