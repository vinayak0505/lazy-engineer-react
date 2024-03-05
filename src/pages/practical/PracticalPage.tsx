import { useEffect } from 'react';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { filesSelector, getFiles } from '../../redux/reducer/files.reducer';
const PracticalPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getFiles());
	}, []);

	const PracticalData = useSelector(filesSelector).data;

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{PracticalData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						title={item.title}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
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