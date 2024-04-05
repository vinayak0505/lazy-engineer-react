import { NavLink } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Card = ({
	id,
	title,
	body,
	link,
	image,
	button,
	maxBodyLines,
	maxTitleLines,
	maxWidth,
	favorite,
	onFavoriteClick
}: {
	id?: string;
	title: string;
	body?: string | null;
	link: string;
	image?: string | null;
	button?: string | null;
	maxBodyLines?: number | null;
	maxTitleLines?: number | null;
	maxWidth?: number | null;
	favorite?: boolean;
	onFavoriteClick?: (id: string, checked: boolean) => void;
}) => (
	<NavLink to={link}>
		<div
			className={`bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
				maxWidth ? `max-w-${maxWidth}` : ''
			}`}
		>
			<div className="relative">
				{favorite === true && (
					<FavoriteOutlinedIcon
						onClick={(e) => {
							e.preventDefault();
							id && onFavoriteClick?.(id, false);
						}}
						className="absolute top-2 right-2 text-red-500 hover:text-red-700"
					/>
				)}
				{favorite === false && (
					<FavoriteBorderOutlinedIcon
						onClick={(e) => {
							e.preventDefault();
							id && onFavoriteClick?.(id, true);
						}}
						className="absolute top-2 right-2 text-red-500 hover:text-red-700"
					/>
				)}

				{image && <img className="rounded-t-lg w-full" src={image} alt={title} />}
				<div className="p-5">
					{title && (
						<h5
							className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-${
								maxTitleLines ? maxTitleLines : 'none'
							}`}
						>
							{title}
						</h5>
					)}
					{body && (
						<h6
							className={`mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-${
								maxBodyLines ? maxBodyLines : 'none'
							}`}
						>
							{body}
						</h6>
					)}
					{button && (
						<NavLink
							to={link}
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							{button}
							<svg
								className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
						</NavLink>
					)}
				</div>
			</div>
		</div>
	</NavLink>
);

export default Card;
