const Button = ({
	children,
	onClick,
	wide = false,
	type = 'button',
	disabled = false,
}: {
	children: JSX.Element | string | number;
	onClick?: () => void;
	wide?: boolean;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}) => {
	return (
		<button
			disabled={disabled}
			onClick={disabled ? undefined : onClick}
			type={type}
			className={
				'rounded-lg px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-blue-800 ' +
				(wide ? 'h-12 w-48' : '') +
				(disabled
					? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
					: 'bg-blue-600 hover:bg-blue-700')
			}
		>
			{children}
		</button>
	);
};

export default Button;
