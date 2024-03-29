import Carousel from '../../components/carousel/Carousel';
import Card from '../../components/cards/Card';
import ResponsiveGrid from '../../components/grid/ResponsiveGrid';

const images = [
	{
		src: 'https://fastly.picsum.photos/id/393/400/200.jpg?hmac=vJt6cRtWra084m3XmqBmS4ZIZiKpfZs6aySbdZpWxmw',
		link: 'https:testing'
	},
	{
		src: 'https://fastly.picsum.photos/id/789/200/300.jpg?hmac=nu1PpKsVA8Td2PEYonJWrmrriU-Km5XoKoEZQ-Tq-6E',
		link: 'https:testing'
	},
	{
		src: 'https://fastly.picsum.photos/id/446/400/200.jpg?hmac=IBuPAYfCz339SW6ylEF0vc9VfTrQ0aJcd842LggDcWc',
		link: 'https:testing'
	},
	{
		src: 'https://fastly.picsum.photos/id/386/400/200.jpg?hmac=OtCJvt6rJcBoCk-IHBp8oRqIsZTmt_vhJSUBtrj7Wn8',
		link: 'https:testing'
	},
	{
		src: 'https://fastly.picsum.photos/id/1020/400/200.jpg?hmac=4dCpPhZLFDBZuJxnkCRrUJyszEIqDf-vZPMTNJuKrao',
		link: 'https:testing'
	}
];

const data = [
	{
		title: 'Jobs',
		body: 'Get all latest jobs post here',
		link: '/jobs',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZWE-Ya5wIZxIJcfbB0_2TsqnnKGGwlrVcPnw1xkcbw&s',
		button: 'View Jobs'
	},
	{
		title: 'Books',
		body: 'Download books for free',
		link: '/books',
		image: './images/bookImage.png',
		button: 'View Books'
	},
	{
		title: 'Notes',
		body: 'You can find handwritten notes from all students',
		link: '/notes',
		image: './images/notesImage.png',
		button: 'View Notes'
	},
	{
		title: 'Question Paper',
		body: 'Previous years Question paper from different universities',
		link: '/paper',
		image: 'https://cdn-icons-png.flaticon.com/512/4542/4542505.png',
		button: 'View Paper'
	},

	{
		title: 'Practical File',
		body: 'See other students practical file',
		link: '/practical',
		image: 'https://static.vecteezy.com/system/resources/previews/017/337/613/non_2x/quality-folder-icon-flat-document-file-vector.jpg',
		button: 'View Practical'
	}
];

const Home = () => {
	return (
		<>
			<Carousel images={images} />
			<div className="mt-4"></div>
			<ResponsiveGrid maxChildrenWidth={220}>
				{data.map((item, index) => (
					<div key={index}>
						<Card
							title={item.title}
							body={item.body}
							link={item.link}
							image={item.image}
							maxWidth={80}
							maxTitleLines={2}
							maxBodyLines={4}
						/>
					</div>
				))}
			</ResponsiveGrid>
		</>
	);
};
export default Home;
