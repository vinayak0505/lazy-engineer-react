import { useSelector } from 'react-redux';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { getPaper, papersSelector, setPaperFav } from '../../redux/reducer/papers.reducer';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
const PaperPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPaper({refresh: true}));
	}, []);

	const PaperData = useSelector(papersSelector).data;

	const onFavoriteClick = (id: string, checked: boolean) => {
		dispatch(setPaperFav({ id, isFavorited: checked }));
	}

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{PaperData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						id={item._id}
						title={item.title}
						body={item.about}
						link={item._id}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						favorite={item.isFavorited}
						onFavoriteClick={onFavoriteClick}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};
export default PaperPage;
