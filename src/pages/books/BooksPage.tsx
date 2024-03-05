import { useSelector } from 'react-redux';
import HorizontalCard from '../../components/cards/HorizontalCard';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';
import { booksSelector, getBooks } from '../../redux/reducer/books.reducer';
import { useAppDispatch } from '../../store';
import { useEffect } from 'react';
const BooksPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getBooks());
	},[])

	const BooksData = useSelector(booksSelector).data;
	
	return (
		<ResponsiveGrid maxChildrenWidth={340}>
			{BooksData.map((item, index) => (
				<div key={index}>
					<HorizontalCard
						title={item.title}
						body={item.about}
						link={item.mediaLink}
						image={item.imageLink}
						maxWidth={'sm'}
						maxTitleLines={2}
						maxBodyLines={4}
						imageText={item.pages + ' pages'}
					/>
				</div>
			))}
		</ResponsiveGrid>
	);
};
export default BooksPage;
