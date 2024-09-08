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
	onFavoriteClick,
	style,
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
	style?: React.CSSProperties;
}) => {
	return (
		<div className="relative" style={style}>
			{favorite === true && (
				<FavoriteOutlinedIcon
					onClick={(e) => {
						e.preventDefault();
						id && onFavoriteClick?.(id, false);
					}}
					className="absolute right-2 top-2 text-red-500 hover:text-red-700"
				/>
			)}
			{favorite === false && (
				<FavoriteBorderOutlinedIcon
					onClick={(e) => {
						e.preventDefault();
						id && onFavoriteClick?.(id, true);
					}}
					className="absolute right-2 top-2 text-red-500 hover:text-red-700"
				/>
			)}
			<NavLink
				to={link}
				className={`flex max-w-xl flex-row items-center rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 max-w-${maxWidth}`}
			>
				{image && (
					<div className="relative">
						<img
							src={image}
							alt={title}
							className="h-56 min-w-32 rounded-s-lg object-cover"
						/>
						{imageText && (
							<div className="absolute bottom-0 right-0">
								<span className="m-0.5 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
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
