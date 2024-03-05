import { useEffect } from 'react';
import Card from '../../components/cards/Card';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { getNotes, notesSelector } from '../../redux/reducer/notes.reducer';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

const NotesPage = () => {

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getNotes());
	},[])

	const NotesData = useSelector(notesSelector).data;

	return (
		<ResponsiveGrid>
			{NotesData.map((item, index) => (
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
