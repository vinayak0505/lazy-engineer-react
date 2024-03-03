import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { PaperData } from "../../redux/reducer/content.reducer";
const PaperPage = () => {
    return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{PaperData.result.map((item, index) => (
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