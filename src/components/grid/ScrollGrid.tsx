import { Masonry } from '@mui/lab';
import { createRef, useEffect, useState } from 'react';

const ResponsiveGrid = ({
	children,
	maxChildrenWidth = 200,
}: {
	children: JSX.Element[];
	maxChildrenWidth?: number;
}) => {
	const elementRef = createRef<HTMLDivElement>();
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const updateWidth = () => {
			if (elementRef.current) {
				setWidth(elementRef.current.offsetWidth);
			}
		};

		updateWidth(); // Initial measurement on component mount

		// Add event listener for window resize (optional)
		window.addEventListener('resize', updateWidth);

		// Clean up function to remove event listener on unmount
		return () => window.removeEventListener('resize', updateWidth);
	}, [elementRef]); // Dependency array ensures the effect runs only when `elementRef` changes

	return (
		<div ref={elementRef} style={{ display: 'flex', justifyContent: 'center' }}>
			<Masonry
				columns={Math.floor(width / maxChildrenWidth)}
				spacing={2}
				style={{ width: 'fit-content' }}
			>
				{children.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			</Masonry>
		</div>
	);
};

export default ResponsiveGrid;
