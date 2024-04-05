import { NavLink } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const HorizontalCard = ({
	id,
	title,
	body,
	link,
	image,
	maxBodyLines = 'none',
	maxTitleLines = 'none',
	maxWidth = 'none',
	imageText,
	children,
	favorite,
	onFavoriteClick
}: {
	id?: string;
	title: string;
	body?: string;
	link: string;
	image?: string | null;
	button?: string | null;
	maxBodyLines?: number | string;
	maxTitleLines?: number | string;
	maxWidth?: number | string;
	imageText?: string;
	children?: JSX.Element | null;
	favorite?: boolean;
	onFavoriteClick?: (id: string, checked: boolean) => void;
}) => {
	return (
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
			<NavLink
				to={link}
				className={`flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 max-w-${maxWidth}`}
			>
				{image && (
					<div className="relative">
						<img
							src={image}
							alt={title}
							className="object-cover h-56 min-w-32 rounded-s-lg"
						/>
						{imageText && (
							<div className="absolute bottom-0 right-0">
								<span className="bg-blue-100 text-blue-800 text-xs font-medium m-0.5 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
									{imageText}
								</span>
							</div>
						)}
					</div>
				)}
				<div className="flex flex-col justify-between p-4 leading-normal">
					<h5
						className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-${maxTitleLines}`}
					>
						{title}
					</h5>
					{children}
					{body && (
						<p
							className={`mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-${maxBodyLines}`}
						>
							{body}
						</p>
					)}
				</div>
			</NavLink>
		</div>
	);
};
export default HorizontalCard;
