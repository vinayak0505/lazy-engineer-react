import Card from '../../components/cards/Card';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { NotesData } from '../../redux/reducer/content.reducer';

const NotesPage = () => {
	return (
		<ResponsiveGrid>
			{NotesData.result.map((item, index) => (
				<div key={index}>
					<Card
						title={item.title}
						body={item.about}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={60}
						maxTitleLines={2}
						maxBodyLines={4}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};

export default NotesPage;
