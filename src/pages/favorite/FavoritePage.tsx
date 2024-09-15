import { useSelector } from 'react-redux';
import { favoriteSelector, getFavorite } from '../../redux/reducer/favorite.reducer';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import HorizontalCard from '../../components/cards/HorizontalCard';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { PapersDataType } from '../../redux/reducer/papers.reducer';
import { NotesDataType } from '../../redux/reducer/notes.reducer';
import Card from '../../components/cards/Card';
import { BookDataType } from '../../redux/reducer/books.reducer';
import { FileDataType } from '../../redux/reducer/files.reducer';
import { JobDataType } from '../../redux/reducer/jobs.reducer';

const FavouritePage = () => {
	const dispatch = useAppDispatch();
	const favData = useSelector(favoriteSelector).data;

	useEffect(() => {
		dispatch(getFavorite());
	}, []);
	return (
		<>
			<FavouritePageComponent title="Notes" data={favData?.note} />
			<FavouritePageComponent title="Question Paper" data={favData?.question_paper} />
			<FavouritePageComponent title="Practicle File" data={favData?.practicleFile} />
			<FavouritePageComponent title="Books" data={favData?.books} />
			<FavouritePageComponent title="Jobs" data={favData?.job} />
		</>
	);
};

const FavouritePageComponent = ({
	title,
	data,
}: {
	title: string;
	data:
		| PapersDataType[]
		| NotesDataType[]
		| BookDataType[]
		| FileDataType[]
		| JobDataType[]
		| undefined;
}) => {
	if (data == null || data?.length === 0) return <></>;
	return (
		<>
			<div className="mb-4 text-2xl text-white">{title}</div>
			<div className="mb-4 flex flex-row gap-4 overflow-x-auto">
				{data?.map((item, index) => (
					<HorizontalCard
						key={index}
						id={item._id}
						title={item.title}
						body={isJobsData(item) ? item.profile : item.about}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						favorite={item.isFavorited}
						style={{ minWidth: '500px' }}
						// onFavoriteClick={onFavoriteClick}
					/>
				))}
			</div>
		</>
	);
};

// Helper function to check if the item is of type NotesDataType
const isJobsData = (
	item: PapersDataType | NotesDataType | BookDataType | FileDataType | JobDataType,
): item is JobDataType => {
	return (item as JobDataType).profile !== undefined;
};
export default FavouritePage;
