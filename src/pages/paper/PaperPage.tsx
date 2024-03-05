import { useSelector } from 'react-redux';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { getPaper, papersSelector } from '../../redux/reducer/papers.reducer';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
const PaperPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPaper());
	}, []);

	const PaperData = useSelector(papersSelector).data;

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{PaperData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						title={item.title}
						body={item.about}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};
export default PaperPage;
