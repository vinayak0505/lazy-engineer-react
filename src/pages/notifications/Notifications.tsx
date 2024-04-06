import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { AlertType, alertSelector, getAlerts } from '../../redux/reducer/alert.reducer';
import { useSelector } from 'react-redux';
import { inputDateFormat } from '../../utility/date.helper';

const Notifications = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAlerts());
	}, []);

	const AlertsData = useSelector(alertSelector).data;

	return (
		<>
			<ol className="relative border-s border-gray-200 dark:border-gray-700">
				{AlertsData?.map((item, index) => (
					<Alert key={index} item={item} />
				))}
			</ol>
		</>
	);
};

const Alert = ({ item }: { item: AlertType }) => {
	const isActive = () => {
		if (new Date(item.startDate) <= new Date() && new Date(item.endDate) >= new Date()) {
			return 'border-white bg-gray-200';
		}
		return 'border-gray-900 bg-gray-700';
	};

	return (
		<li className="mb-8 ms-4">
			<div
				className={'absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border ' + isActive()}
			></div>
			<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
				{`From: ${inputDateFormat(item.startDate)}  To: ${inputDateFormat(item.endDate)}`}
			</time>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.heading}</h3>
			<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.message}</p>
			<a
				href={item.link}
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
			>
				Learn more{' '}
				<svg
					className="w-3 h-3 ms-2 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</a>
		</li>
	);
};

export default Notifications;
