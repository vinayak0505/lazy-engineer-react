import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { BooksData } from "../../redux/reducer/notes.reducer";
const BooksPage = () => {
    return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{BooksData.result.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						title={item.title}
						body={item.about}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						imageText={item.pages + " pages"}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};
export default BooksPage;