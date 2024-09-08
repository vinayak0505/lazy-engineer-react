import { useSelector } from 'react-redux';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { booksSelector, getBooks, setBookFav } from '../../redux/reducer/books.reducer';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
const BooksPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getBooks({ refresh: true }));
	}, []);

	const BooksData = useSelector(booksSelector).data;

	const onFavoriteClick = (id: string, checked: boolean) => {
		dispatch(setBookFav({ id, isFavorited: checked }));
	};

	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{BooksData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						id={item._id}
						title={item.title}
						body={item.about}
						link={item._id}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						imageText={item.pages + ' pages'}
						favorite={item.isFavorited}
						onFavoriteClick={onFavoriteClick}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};
export default BooksPage;
