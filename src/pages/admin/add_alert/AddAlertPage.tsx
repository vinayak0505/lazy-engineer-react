import { useState } from 'react';
import UploadUI from '../../../components/UploadUI';
import { AlertsTags } from '../../../utility/constants';
import InputChip from '../../../components/chips/InputChip';
import Button from '../../../components/buttons/Button';
import ContentService from '../../../redux/service/content.service';
import { useAppDispatch } from '../../../store';
import { helperAction } from '../../../redux/reducer/helper.reducer';
import { DatePicker } from '../../../components/custom_input/DatePicker';
import { dateAddDays, inputDateFormat } from '../../../utility/date.helper';

const DefaultAlertValue = {
	heading: '',
	message: '',
	link: '',
	startDate: inputDateFormat(new Date()),
	endDate: inputDateFormat(dateAddDays(new Date(), 1))
};

export const AlertsUploadPage = () => {
	const [image, setImage] = useState<File | null>(null);
	const [tags, setTags] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	const [alerts, setAlerts] = useState(DefaultAlertValue);
	const [loading, setLoading] = useState(false);

	const updateAlerts = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setAlerts({
			...alerts,
			[name]: value
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData(e.currentTarget as HTMLFormElement);
            formData.delete('startDate');
            formData.delete('endDate');
            formData.append('startDate',Date.parse(alerts.startDate).toString());
            formData.append('endDate',Date.parse(alerts.endDate).toString());
			tags.forEach((tag) => formData.append('tags[]', tag));
			const data = await ContentService.addAlerts(formData);
			if (data.status != 'success') throw new Error(data.message ?? 'Something went wrong');
			setImage(null);
			setTags([]);
			setAlerts(DefaultAlertValue);
            console.log(DefaultAlertValue);
            
			dispatch(helperAction.customToast('Alerts uploaded successfully'));
		} catch (error: any) {
			dispatch(helperAction.customToast(error?.message ?? 'Something went wrong'));
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
			<div className="mt-4">
				<label
					htmlFor="image"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Upload Image
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
					htmlFor="heading"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Heading
				</label>
				<input
					type="text"
					id="heading"
					name="heading"
					value={alerts?.heading}
					onChange={updateAlerts}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="File Heading"
					required
				/>
			</div>
			<div className="mt-4">
				<label
					htmlFor="message"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Message
				</label>
				<textarea
					name="message"
					value={alerts?.message}
					onChange={updateAlerts}
					id="message"
					rows={4}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Leave a comment..."
				></textarea>
			</div>
			<div className="mt-4">
				<label
					htmlFor="link"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Link
				</label>
				<input
					name="link"
					value={alerts?.link}
					onChange={updateAlerts}
					type="text"
					id="link"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					placeholder="File Link"
					required
				/>
			</div>
			<div className="mt-4 flex gap-7">
				<span>
					<DatePicker
						title="Start Date"
						name="startDate"
						value={alerts?.startDate}
						onChange={updateAlerts}
					/>
				</span>
				<span>
					<DatePicker
						title="End Date"
						name="endDate"
						value={alerts?.endDate}
						onChange={updateAlerts}
					/>
				</span>
			</div>
			<div className="mt-4">
				<label
					htmlFor="tags"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Tags
				</label>
				<InputChip options={AlertsTags} selected={tags} setSelected={setTags} />
			</div>
			<div className="mt-4 flex justify-center">
				<Button wide type="submit" disabled={loading}>
					{loading ? 'Submitting' : 'Submit'}
				</Button>
			</div>
		</form>
	);
};
