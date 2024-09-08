import { useEffect, useState } from 'react';
import Styles from './Carousel.module.scss';

const Carousel = ({
	images,
	visible = true,
}: {
	images: { src: string; link: string; alt: string }[];
	visible?: boolean;
}) => {
	const [slider, setSlider] = useState(0);

	const nextSlider = () => {
		setSliderNumber((slider + 1) % images.length);
	};

	const prevSlider = () => {
		setSliderNumber((slider - 1 + images.length) % images.length);
		setSlider((slider + images.length - 1) % images.length);
	};

	const setSliderNumber = (index: number) => {
		if (index == slider) return;
		document.getElementById(`data-carousel-home-item-${slider}`)?.classList.add('hidden');
		document
			.getElementById(`data-carousel-home-button-${slider}`)
			?.classList.remove('dark:bg-gray-800');
		document
			.getElementById(`data-carousel-home-button-${slider}`)
			?.classList.add('dark:bg-gray-500');
		document.getElementById(`data-carousel-home-item-${index}`)?.classList.remove('hidden');
		document
			.getElementById(`data-carousel-home-button-${index}`)
			?.classList.remove('dark:bg-gray-500');
		document.getElementById(`data-carousel-home-button-${index}`)?.classList.add('dark:bg-gray-800');
		setSlider(index);
	};

	useEffect(() => {
		if (visible == false) return;
		document.getElementById(`data-carousel-home-item-0`)?.classList.remove('hidden');
		document.getElementById(`data-carousel-home-button-0`)?.classList.add('dark:bg-gray-800');
		document.getElementById(`data-carousel-home-button-0`)?.classList.remove('dark:bg-gray-500');
	}, [visible]);
	if (visible == false) return <></>;
	return (
		<>
			<div
				id="default-carousel"
				className={'relative mb-4 w-full ' + Styles.ele}
				data-carousel="slide"
			>
				{/* <!-- Carousel wrapper --> */}
				<div className="relative h-40 overflow-hidden rounded-lg md:h-56 xl:h-96">
					{/* <!-- Item 1 --> */}
					{images.map((image, index) => (
						<div
							key={index}
							className="hidden duration-700 ease-in-out"
							id={`data-carousel-home-item-${index}`}
						>
							<a href={image.link} target="_blank" rel="noreferrer">
								<img
									src={image.src}
									className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
									alt={image.alt}
								/>
							</a>
						</div>
					))}
				</div>
				{/* <!-- Slider indicators --> */}
				<div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
					{images.map((image, index) => (
						<button
							key={index}
							type="button"
							id={`data-carousel-home-button-${index}`}
							className="border-white-500 h-4 w-4 rounded-full border-2 dark:bg-gray-500"
							onClick={() => setSliderNumber(index)}
						></button>
					))}
				</div>
				{/* <!-- Slider controls --> */}
				<button
					type="button"
					className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
					onClick={prevSlider}
				>
					<span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
						<svg
							className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
						<span className="sr-only">Previous</span>
					</span>
				</button>
				<button
					type="button"
					className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
					onClick={nextSlider}
				>
					<span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
						<svg
							className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
						<span className="sr-only">Next</span>
					</span>
				</button>
			</div>
		</>
	);
};
export default Carousel;
