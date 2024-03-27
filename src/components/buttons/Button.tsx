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
				'text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center focus:ring-blue-800 ' +
				(wide ? 'w-48 h-12 ' : '')+
				(disabled ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'bg-blue-600 hover:bg-blue-700')
			}
		>
			{children}
		</button>
	);
};

export default Button;
