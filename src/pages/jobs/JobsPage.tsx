import { useSelector } from 'react-redux';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { getJobs, jobsSelector, setJobFav } from '../../redux/reducer/jobs.reducer';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
const JobsPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getJobs({ refresh: true }));
	}, []);

	const JobsData = useSelector(jobsSelector).data;

	const onFavoriteClick = (id: string, checked: boolean) => {
		dispatch(setJobFav({ id, isFavorited: checked }));
	};

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{JobsData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						id={item._id}
						title={item.title}
						link={item._id}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						imageText={item.datePosted}
						favorite={item.isFavorited}
						onFavoriteClick={onFavoriteClick}
					>
						<JobsBody
							items={[
								'Company : ' + item.company,
								'Location : ' + item.location,
								'College : ' + item.jobType,
							]}
						/>
					</HorizontalCard>
				</div>
			))}
		</ResponsiveGrid>
	);
};

const JobsBody = ({ items }: { items: string[] }) => {
	return (
		<>
			{items.map((item, key) => (
				<p key={key}>{item}</p>
			))}
		</>
	);
};

export default JobsPage;
