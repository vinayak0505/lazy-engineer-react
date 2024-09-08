export const DatePicker = ({
	title,
	className,
	required = false,
	value,
	onChange,
	name,
}: {
	title: string;
	className?: string;
	required?: boolean;
	value: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	name?: string;
}) => {
	return (
		<>
			<label
				htmlFor={name}
				className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
			>
				{title}
			</label>
			<input
				name={name}
				type="date"
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				value={value}
				required={required}
				onChange={onChange}
				className={
					className ??
					'dark:shadow-sm-light block inline-flex w-full items-center rounded-lg border border-gray-300 bg-blue-700 bg-gray-50 p-2.5 px-5 py-2.5 text-center text-sm font-medium text-gray-900 text-white shadow-sm hover:bg-blue-800 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-blue-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:bg-blue-700 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:ring-blue-800'
				}
			/>
		</>
	);
};
