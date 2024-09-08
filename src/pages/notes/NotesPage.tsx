import { useEffect } from 'react';
import Card from '../../components/cards/Card';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { getNotes, notesSelector, setNotesFav } from '../../redux/reducer/notes.reducer';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

const NotesPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getNotes({ refresh: true }));
	}, []);

	const onFavoriteClick = (id: string, checked: boolean) => {
		dispatch(setNotesFav({ id, isFavorited: checked }));
	};

	const NotesData = useSelector(notesSelector).data;

	return (
		<ResponsiveGrid>
			{NotesData.map((item, index) => (
				<div key={index}>
					<Card
						id={item._id}
						title={item.title}
						body={item.about}
						link={item._id}
						image={item.imageLink}
						maxWidth={60}
						maxTitleLines={2}
						maxBodyLines={4}
						favorite={item.isFavorited}
						onFavoriteClick={onFavoriteClick}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};

export default NotesPage;
