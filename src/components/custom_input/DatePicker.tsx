export const DatePicker = ({
	title,
	className,
	required = false,
	value,
	onChange,
	name
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
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
					'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				}
			/>
		</>
	);
};
