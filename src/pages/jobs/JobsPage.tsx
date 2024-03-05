import { useSelector } from 'react-redux';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { getJobs, jobsSelector } from '../../redux/reducer/jobs.reducer';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store';
const JobsPage = () => {

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getJobs());
	})
	const JobsData = useSelector(jobsSelector).data;

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{JobsData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						title={item.title}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						imageText={item.datePosted}
					>
						<JobsBody
							items={[
								'Company : ' + item.company,
								'Location : ' + item.location,
								'College : ' + item.jobType
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
				<p  key={key}>
					{item}
				</p>
			))}
		</>
	);
};

export default JobsPage;