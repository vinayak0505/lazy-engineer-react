import { useState } from 'react';
import UploadUI from '../../components/UploadUI';
import { InputDropDown } from '../../components/custom_input/DropDown';
import { BooksTags, semesters } from '../../utility/constants';
import InputChip from '../../components/chips/InputChip';
import Button from '../../components/buttons/Button';
import ContentService from '../../redux/service/content.service';
import { useAppDispatch } from '../../store';
import { helperAction } from '../../redux/reducer/helper.reducer';

const DefaultBookValue = {
	title: '',
	writer: '',
	about: '',
	subject: '',
	semester: '',
	pages: undefined,
	bookEdition: '',
	price: undefined,
};

export const BooksUploadComponent = () => {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<File | null>(null);
	const [tags, setTags] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	const [Books, setBooks] = useState(DefaultBookValue);
	const [loading, setLoading] = useState(false);

	const updateBooks = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setBooks({
			...Books,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData(e.currentTarget as HTMLFormElement);
			tags.forEach((tag) => formData.append('tags[]', tag));
			const data = await ContentService.addBooks(formData);
			if (data.status != 'success') throw new Error(data.message ?? 'Something went wrong');
			setFile(null);
			setImage(null);
			setTags([]);
			setBooks(DefaultBookValue);
			dispatch(helperAction.customToast('Books uploaded successfully'));
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
					value={Books?.title}
					onChange={updateBooks}
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="File Title"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="title"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Writers
				</label>
				<input
					type="text"
					id="writer"
					name="writer"
					value={Books?.writer}
					onChange={updateBooks}
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="All Writers Name"
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
					value={Books?.about}
					onChange={updateBooks}
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
					value={Books?.subject}
					onChange={updateBooks}
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
						value={Books?.semester}
						onChange={updateBooks}
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
						Pages
					</label>
					<input
						name="pages"
						id="pages"
						value={Books?.pages}
						type="number"
						onChange={updateBooks}
						title="Total Number of pages"
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
					Books Edition
				</label>
				<input
					type="text"
					id="bookEdition"
					name="bookEdition"
					value={Books?.bookEdition}
					onChange={updateBooks}
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Edition of book(leave black if none)"
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="chapter"
					className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				>
					Price
				</label>
				<input
					type="number"
					id="price"
					className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Price in rs"
					name="price"
					value={Books?.price}
					onChange={updateBooks}
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
				<InputChip options={BooksTags} selected={tags} setSelected={setTags} />
			</div>
			<div className="mt-4 flex justify-center">
				<Button wide type="submit" disabled={loading}>
					{loading ? 'Submitting' : 'Submit'}
				</Button>
			</div>
		</form>
	);
};
