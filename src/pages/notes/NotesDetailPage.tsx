import { useEffect, useState } from 'react';
import { NotesDataType } from '../../redux/reducer/notes.reducer';
import ContentService, { FAVORITEENUM } from '../../redux/service/content.service';
import { useParams } from 'react-router-dom';
import Chip from '../../components/chips/Chip';
import { UserType } from '../../redux/reducer/auth.reducer';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';

const NotesDetailPage = () => {
	const id = useParams().id;

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<NotesDataType | null>(null);

	useEffect(() => {
		(async () => {
			if (id == undefined) return;
			const res = await ContentService.getDetailNotes(id);
			setLoading(false);
			setData(res.data);
		})();
	}, []);

	const onFavoriteClick = async () => {
		const checked = data?.isFavorited;
		if (checked == null || id == null || data == null) return;
		const res = await ContentService.setFavorite(id, !checked, FAVORITEENUM.NOTE);
		if (res.status == 'success') setData({ ...data, isFavorited: !checked });
	};

	if (loading) return <>Loading</>;
	return (
		<div className="text-white">
			<div className="flex flex-wrap flex-col-reverse sm:flex-nowrap sm:flex-row mb-4 sm:mb-0">
				<img
					className="sm:w-1/3 w-40 mr-4 object-contain h-min rounded border"
					src={data?.imageLink}
					alt=""
				/>
				<div>
					<h2 className="mb-2 text-3xl font-bold text-white">{data?.title}</h2>
					<Separator title="Uploaded By" value={(data?.userId as UserType)?.fullName} />
					<Separator title="Unit" value={data?.unit} />
					<Separator title="Semester" value={data?.semester} />
					<Separator title="Subject" value={data?.subject} />
					<Separator title="Chapter" value={data?.chapter} />
					<Separator className="mb-4" title="Topic" value={data?.topic} />
					<div className="mb-4">
						{data?.tags?.map((tag, index) => (
							<Chip key={index} title={tag} />
						))}
					</div>
					{(data?.isFavorited === true || data?.isFavorited === false) && (
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								onFavoriteClick();
							}}
							className="mb-4 inline-flex items-center text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							{data.isFavorited ? (
								<>
									Remove From Favourite
									<FavoriteRounded className="ml-2  text-red-500" />
								</>
							) : (
								<>
									Add To Favourite
									<FavoriteBorderRounded className="ml-2 text-red-500" />
								</>
							)}
						</button>
					)}
					<a href={data?.mediaLink}>
						<button
							type="button"
							className="inline-flex items-center  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Download
							<DownloadRounded className="ml-2" />
						</button>
					</a>
				</div>
			</div>

			<p className="text-xl font-bold text-white underline">About </p>
			<p className="text-grey-100 text-xl mb-4">{data?.about}</p>
		</div>
	);
};

const Separator = ({
	title,
	value,
	className
}: {
	title: string;
	value?: string;
	className?: string;
}) => {
	return (
		<p className={className}>
			<span className="text-xl font-bold text-white">{title} :- </span>
			<span className="text-grey-100 text-xl">{value}</span>
		</p>
	);
};
export default NotesDetailPage;
