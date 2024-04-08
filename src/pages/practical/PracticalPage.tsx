import { useEffect } from 'react';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { filesSelector, getFiles, setFileFav } from '../../redux/reducer/files.reducer';
const PracticalPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getFiles({refresh: true}));
	}, []);

	const PracticalData = useSelector(filesSelector).data;

	const onFavoriteClick = (id: string, checked: boolean) => {
		dispatch(setFileFav({ id, isFavorited: checked }));
	}

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{PracticalData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						id={item._id}
						title={item.title}
						link={item._id}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						favorite={item.isFavorited}
						onFavoriteClick={onFavoriteClick}
					>
						<PracticalBody
							items={[
								'Semester : ' + item.semester,
								'Subject : ' + item.subject,
								'College : ' + item.college,
								'About : ' + item.about
							]}
						/>
					</HorizontalCard>
				</div>
			))}
		</ResponsiveGrid>
	);
};

const PracticalBody = ({ items }: { items: string[] }) => {
	return (
		<>
			{items.map((item, key) => (
				<p className="line-clamp-1" key={key}>
					{item}
				</p>
			))}
		</>
	);
};
export default PracticalPage;