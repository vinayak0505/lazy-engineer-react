import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { JobsData } from '../../redux/reducer/content.reducer';
const JobsPage = () => {
	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{JobsData.result.map((item, index) => (
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
