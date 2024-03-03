import { NavLink } from 'react-router-dom';

const HorizontalCard = ({
	title,
	body,
	link,
	image,
	button,
	maxBodyLines = 'none',
	maxTitleLines = 'none',
	maxWidth = 'none',
}: {
	title: string;
	body?: string | null;
	link: string;
	image?: string | null;
	button?: string | null;
	maxBodyLines?: number | string;
	maxTitleLines?: number | string;
	maxWidth?: number | string;
}) => {
	return (
		<NavLink
			to={link}
			className={`flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 max-w-${maxWidth}`}
		>
			{image && (
				<img
					className="object-cover h-56 w-32 rounded-s-lg"
					src={image}
					alt={title}
				/>
			)}
			<div className="flex flex-col justify-between p-4 leading-normal">
				<h5
					className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-${maxTitleLines}`}
				>
					{title}
				</h5>
				<p className={`mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-${maxBodyLines}`}>{body}</p>
			</div>
		</NavLink>
	);
};
export default HorizontalCard;
