import Carousel from '../../components/carousel/Carousel';
import Card from '../../components/cards/Card';

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
		title: 'Notes',
		body: 'verry long body that must be sue alskdjf akd asivne akd',
		link: '/notes',
		image: 'https://fastly.picsum.photos/id/446/400/200.jpg?hmac=IBuPAYfCz339SW6ylEF0vc9VfTrQ0aJcd842LggDcWc'
	},
	{
		title: 'Books',
		body: 'verry long body that must be sue alskdjf akd asivne akd',
		link: '/books',
		image: 'https://fastly.picsum.photos/id/789/200/300.jpg?hmac=nu1PpKsVA8Td2PEYonJWrmrriU-Km5XoKoEZQ-Tq-6E'
	},
	{
		title: 'Practical',
		body: 'verry long body that must be sue alskdjf akd asivne akd',
		link: '/practical',
		image: 'https://fastly.picsum.photos/id/393/400/200.jpg?hmac=vJt6cRtWra084m3XmqBmS4ZIZiKpfZs6aySbdZpWxmw'
	},
	{
		title: 'Jobs',
		body: 'verry long body that must be sue alskdjf akd asivne akd',
		link: '/jobs',
		image: 'https://fastly.picsum.photos/id/386/400/200.jpg?hmac=OtCJvt6rJcBoCk-IHBp8oRqIsZTmt_vhJSUBtrj7Wn8'
	},
	{
		title: 'Paper',
		body: 'verry long body that must be sue alskdjf akd asivne akd',
		link: '/paper',
		image: 'https://fastly.picsum.photos/id/1020/400/200.jpg?hmac=4dCpPhZLFDBZuJxnkCRrUJyszEIqDf-vZPMTNJuKrao'
	}
];
const Home = () => {
	return (
		<>
			<Carousel images={images} />
			<div className="grid md:grid-cols-2 gap-4 mt-4 xl:grid-cols-3 2xl:grid-cols-4">
				{data.map((item, index) => (
					<Card {...item} key={index} />
				))}
			</div>
		</>
	);
};
export default Home;
