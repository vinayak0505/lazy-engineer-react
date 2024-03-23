const Button = ({
	children,
	onClick,
	wide = false,
	type = 'button'
}: {
	children: JSX.Element | string | number;
	onClick?: () => void;
	wide?: boolean;
	type?: 'button' | 'submit' | 'reset';
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			className={
				'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ' +
				(wide ? 'w-48 h-12' : '')
			}
		>
			{children}
		</button>
	);
};

export default Button;
